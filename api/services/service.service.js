const pool = require("../../config/database");

var errorMessage = "Error while connecting to database server";

function checkMissingElement(uploadedFiles){
    var fields = ['serviceCoverImageUrl'];
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
        var data = req.body;
        const now = new Date();
        data.serviceCreateAt = now;
        const baseUrl = process.env.BASE_URL;
        const fileUrls = req.files.map(file => `${baseUrl}/files/${file.originalname}`);
        if(fileUrls.length > 0)
        {
            coverImageUrl = fileUrls[0];
        }
        pool.query(`select * from one_off_services where serviceTitle = ?`, [data.serviceTitle], (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            if(result.length <= 0)
            {
               var fields = [data.serviceCategoryId, data.serviceTitle, data.serviceSubtitle, data.serviceDescription,  coverImageUrl, data.price, data.duration, data.serviceCreateAt];
                pool.query(`insert into one_off_services (serviceCategoryId, serviceTitle, serviceSubtitle, serviceDescription, serviceCoverImageUrl, price, duration, serviceCreateAt) values(?,?,?,?,?,?,?,?)`, fields,
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
                
            });
            var missingElement = checkMissingElement(req.files);
            var query = "";
            var fields = [];
            if(missingElement === "serviceCoverImageUrl")
            {
                query = `Update one_off_services set serviceCategoryId = ?, serviceTitle = ?, serviceSubtitle = ?, serviceDescription = ?, price = ?, duration = ?, serviceUpdateAt = ? where serviceId = ?`;
                var fields = [data.serviceCategoryId, data.serviceTitle, data.serviceSubtitle, data.serviceDescription, data.price, data.duration, data.serviceUpdateAt, data.serviceId];
            }
            else
            {
                query = `Update one_off_services set serviceCategoryId = ?, serviceTitle = ?, serviceSubtitle = ?, serviceDescription = ?, serviceCoverImageUrl = ? ,price = ?, duration = ?, serviceUpdateAt = ? where serviceId = ?`;
                var fields = [data.serviceCategoryId, data.serviceTitle, data.serviceSubtitle, data.serviceDescription, coverImageUrl, data.price, data.duration, data.serviceUpdateAt, data.serviceId];
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
            query = `Update one_off_services set serviceCategoryId = ?, serviceTitle = ?, serviceSubtitle = ?, serviceDescription = ?,price = ?, duration = ?, serviceUpdateAt = ? where serviceId = ?`;
            var fields = [data.serviceCategoryId, data.serviceTitle, data.serviceSubtitle, data.serviceDescription,data.price, data.duration, data.serviceUpdateAt, data.serviceId];
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
        var text = data.text;
        if(!text)
        {
            text = "";
        }
        var query = `SELECT
        
        os.serviceId,
        os.serviceCategoryId,
        os.serviceTitle,
        os.serviceSubtitle,
        os.serviceDescription,
        os.serviceCoverImageUrl,
        os.duration,
        os.price,
        os.serviceCreateAt,
        os.serviceUpdateAt,
       
        ssc.subCategoryId,
        ssc.subCategoryServiceId,
        ssc.subCategoryTitle,
        ssc.subCategoryDescription,
        ssc.subCategoryUrl,
    
        ss.subServiceId,
        ss.subServiceSubCategoryId,
        ss.subServiceTitle,
        ss.subServiceSubtitle,
        ss.subServiceDescription,
        ss.subServiceImageUrl,
        ss.subServiceDuration,
        ss.subServicePrice,
        ss.subServiceCreateAt,
        ss.subServiceUpdateAt
        
        FROM one_off_services os 
        LEFT JOIN service_sub_categories ssc ON os.serviceId = ssc.subCategoryServiceId
        LEFT JOIN sub_services ss ON ssc.subCategoryId = ss.subServiceSubCategoryId
        Where serviceTitle like ? or serviceSubtitle like ? or serviceDescription like ? or subCategoryTitle like ? or subServiceTitle like ? or subServiceSubtitle like ? or subServiceDescription like ? order by serviceCategoryId asc;
    `;
        
        pool.query(query,
        [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%` ],
            (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }

            var rows = result;
            const services= [];

            for (const row of rows) {
                let service = services.find((s) => s.serviceId === row.serviceId);

                    if (!service) {
                        service = {
                            serviceId: row.serviceId,
                            serviceCategoryId: row.serviceCategoryId,
                            serviceTitle: row.serviceTitle,
                            serviceSubtitle: row.serviceSubtitle,
                            serviceDescription: row.serviceDescription,
                            serviceCoverImageUrl: row.serviceCoverImageUrl,
                            duration: row.duration,
                            price : row.price,
                            serviceCreateAt: row.serviceCreateAt,
                            serviceUpdateAt: row.serviceUpdateAt,
                            subCategories: []
                        };
                        services.push(service);
                    }
            
                    if(row.subCategoryId != null)
                    {
                        let subCategory = service.subCategories.find((sc) => sc.subCategoryId === row.subCategoryId);
                
                        if (!subCategory) {
                            subCategory = {
                                subCategoryId: row.subCategoryId,
                                subCategoryServiceId: row.subCategoryServiceId,
                                subCategoryTitle: row.subCategoryTitle,
                                subCategoryDescription: row.subCategoryDescription,
                                subCategoryUrl: row.subCategoryUrl,
                                subServices: []
                            };
                            service.subCategories.push(subCategory);
                        }

                        if(row.subServiceId != null)
                        {
                            let subService = subCategory.subServices.find((sc) => sc.subServiceId === row.subServiceId);
                            if(!subService)
                            {
                                subService = {
                                    subServiceId: row.subServiceId,
                                    subServiceSubCategoryId: row.subServiceSubCategoryId,
                                    subServiceTitle: row.subServiceTitle,
                                    subServiceSubtitle : row.subServiceSubtitle,
                                    subServiceDescription: row.subServiceDescription,
                                    subServiceImageUrl: row.subServiceImageUrl,
                                    subServiceDuration: row.subServiceDuration,
                                    subServicePrice: row.subServicePrice,
                                    subServiceCreateAt: row.subServiceCreateAt,
                                    subServiceUpdateAt: row.subServiceUpdateAt,
                                };
                                subCategory.subServices.push(subService);
                            }
                        }
                    }
                        
                }
            
            return callback(null, services);
            }
        );
    },

}