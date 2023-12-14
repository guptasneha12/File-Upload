const cloudinary=require('cloudinary').v2;    // v2 means version 2
const {CloudinaryStorage}=require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: 'dkvtqatjr', 
    api_key: '612411895164479', 
    api_secret: 'EMc97qXA1C_nS5y45zZVoxcYyMc' 
  });


  // instance of cloudinary-storage
  const storage=new CloudinaryStorage({
    cloudinary,     
       //  the place where we want to save the images
    allowedFormats:['jfif','png',"jpg"],     //the type of file we need
   // we are going to tarnsform image to specific size
    params:{
        folder:'nodejs',
        tranformation:[{width:500,height:500,crop:"limit"}],


    },


  });

module.exports=storage;