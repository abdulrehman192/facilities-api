const pool = require("../../config/database");

var errorMessage = "Error while connecting to database server";

function checkMissingElement(uploadedFiles){
    var fields = ['serviceCoverImageUrl', 'serviceIconUrl'];
      var missing = [];
      for (const obj of uploadedFiles) {
        fields.forEach(function(field)
        {
          if(obj.fieldname === field)
          {
            if(!missing.includes(field))
            {
              missing.push(field);
            }
          }
        });
      }
      return fields.find(elementB => !missing.includes(elementB));
  }

module.exports = {
    create : (req, callback) => {
        // Initialize imageUrl to null
        let coverImageUrl = null;
        let iconImageUrl = null;
        var data = req.body;
        const now = new Date();
        data.serviceCreateAt = now;
        const baseUrl = process.env.BASE_URL;
        const fileUrls = req.files.map(file => `${baseUrl}/files/${file.originalname}`);
        if(fileUrls.length > 0)
        {
            coverImageUrl = fileUrls[0];
            iconImageUrl = fileUrls[1];
        }
        pool.query(`select * from one_off_services where serviceTitle = ?`, [data.serviceTitle], (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            if(result.length <= 0)
            {
               var fields = [data.serviceCategoryId, data.serviceTitle, data.serviceSubtitle, data.serviceDescription,  coverImageUrl, iconImageUrl, data.serviceCreateAt];
                pool.query(`insert into one_off_services (serviceCategoryId, serviceTitle, serviceSubtitle, serviceDescription, serviceCoverImageUrl, serviceIconUrl, serviceCreateAt) values(?,?,?,?,?,?,?)`, fields,
                    (error, results, fields) =>{
                        if(error)
                        {
                            return callback(errorMessage);
                        }
                        else
                        {
                          return callback(null, "service successfully create");
                        }
                    }
                );
            }
            else{
                return callback("service already exists with this title. Please enter other title");
            }
        });
       
    },
    update : (req, callback) => {
        let coverImageUrl = null;
        let iconImageUrl = null;
        var data = req.body;
        const now = new Date();
        data.serviceUpdateAt = now;
        const baseUrl = process.env.BASE_URL;
        if(req.files.length > 0)
        {   
            var files = req.files;
            files.forEach(function(obj){
            
                if(obj.fieldname === 'serviceCoverImageUrl')
                {
                    coverImageUrl = `${baseUrl}/files/${obj.originalname}`;
                }
                if(obj.fieldname === 'serviceIconUrl')
                {
                    iconImageUrl = `${baseUrl}/public/files/${obj.originalname}`;
                }
            });
            var missingElement = checkMissingElement(req.files);
            var query = "";
            var fields = [];
            if(missingElement === "serviceCoverImageUrl")
            {
                query = `Update one_off_services set serviceCategoryId = ?, serviceTitle = ?, serviceSubtitle = ?, serviceDescription = ?, serviceIconUrl = ?, serviceUpdateAt = ? where serviceId = ?`;
                var fields = [data.serviceCategoryId, data.serviceTitle, data.serviceSubtitle, data.serviceDescription, iconImageUrl, data.serviceUpdateAt, data.serviceId];
            }
            else if(missingElement === "serviceIconUrl")
            {
                query = `Update one_off_services set serviceCategoryId = ?, serviceTitle = ?, serviceSubtitle = ?, serviceDescription = ?, serviceCoverImageUrl = ?, serviceUpdateAt = ? where serviceId = ?`;
                var fields = [data.serviceCategoryId, data.serviceTitle, data.serviceSubtitle, data.serviceDescription, coverImageUrl, data.serviceUpdateAt, data.serviceId];
            }
            else
            {
                query = `Update one_off_services set serviceCategoryId = ?, serviceTitle = ?, serviceSubtitle = ?, serviceDescription = ?, serviceCoverImageUrl = ?, serviceIconUrl = ?, serviceUpdateAt = ? where serviceId = ?`;
                var fields = [data.serviceCategoryId, data.serviceTitle, data.serviceSubtitle, data.serviceDescription, coverImageUrl, iconImageUrl, data.serviceUpdateAt, data.serviceId];
            }
            
            pool.query(query, fields,
            (error, result, fields) => 
            {
                if(error)
                {
                    return callback(errorMessage);
                }
                else{
                    
                    return callback(null, "service successfully updated");
                }
                
            });
        }
        else{
            query = `Update one_off_services set serviceCategoryId = ?, serviceTitle = ?, serviceSubtitle = ?, serviceDescription = ?, serviceUpdateAt = ? where serviceId = ?`;
            var fields = [data.serviceCategoryId, data.serviceTitle, data.serviceSubtitle, data.serviceDescription, data.serviceUpdateAt, data.serviceId];
            pool.query(query, fields,
            (error, result, fields) => 
            {
                if(error)
                {
                    return callback(errorMessage);
                }
                else{
                    
                    return callback(null, "service successfully updated");
                }
                
            });
        }
        
       
    },

    deleteService : (req, callback) =>{
        var data = req.body;
        pool.query("Delete from one_off_services where serviceId = ?", [data.serviceId], (error, result, fields) => {
            if(error)
        {
            return callback(errorMessage);
        }
        return callback(null, "service  successfully deleted");
        } );
    },

    getServices : (data, callback)=> {
        var query = "Select s.serviceId, categorySr, serviceCategoryId, categoryTitle, categoryImageUrl, serviceTitle, serviceSubtitle, serviceDescription, serviceCoverImageUrl, serviceIconUrl   from one_off_services s inner join service_categories c on s.serviceCategoryId = c.categoryId";
        if(data.text)
        {
            query = "Select s.serviceId, categorySr, serviceCategoryId, categoryTitle, categoryImageUrl, serviceTitle, serviceSubtitle, serviceDescription, serviceCoverImageUrl, serviceIconUrl   from one_off_services s inner join service_categories c on s.serviceCategoryId = c.categoryId where serviceTitle like ? or serviceSubtitle like ? or serviceDescription like ? or categoryTitle like ?";
        }
        var text = data.text;

        pool.query(query,
        [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`],
            (error, result, fields) => {
            if(error)
            {
                return callback(error);
            }
            return callback(null, result);
            }
        );
    },

}