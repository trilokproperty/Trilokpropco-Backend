import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { statusRouter } from "./Routers/status.js";
import { typeRouter } from "./Routers/type.js";
import { amenitiesRouter } from "./Routers/amenities.js";
import { developerRouter } from "./Routers/developer.js";
import { propertyRouter } from "./Routers/property.js";
import { blogCategoryRouter } from "./Routers/blogCategory.js";
import { blogRouter } from "./Routers/blog.js";
import { cityRouter } from "./Routers/city.js";
import { testimonialRouter } from "./Routers/testimonial.js";
import { partnerRouter } from "./Routers/partner.js";
import { footerRouter } from "./Routers/footer.js";
import { formRouter } from "./Routers/formData.js";
import { aboutRouter } from "./Routers/about.js";
import { whyRouter } from "./Routers/why.js";
import { servicesRouter } from "./Routers/services.js";
import { userRouter } from "./Routers/user.js";
import { metaRouter } from "./Routers/meta.js";
import request from "request";

const app = express();
const PORT = 5000;
dotenv.config()
app.use(cors({
  origin: '*', // Allow all origins - change this to your specific origin if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));
app.use(express.json())
app.use('/api/status', statusRouter);
app.use('/api/type', typeRouter);
app.use('/api/amenity', amenitiesRouter);
app.use('/api/developer', developerRouter);
app.use('/api/property', propertyRouter);
app.use('/api/blogCategory', blogCategoryRouter);
app.use('/api/blog', blogRouter);
app.use('/api/city', cityRouter);
app.use('/api/testimonial', testimonialRouter);
app.use('/api/partner', partnerRouter);
app.use('/api/footer', footerRouter);
app.use('/api/about', aboutRouter);
app.use('/api/why', whyRouter);
app.use('/api/service', servicesRouter);
app.use('/api/inquire', formRouter);
app.use('/api/user', userRouter);s
app.use('/api/meta', metaRouter);

// Updated proxy setup
app.use('/api/proxy/*', (req, res, next) => {
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.status(204).end();
    }
  
    // Construct the full URL by decoding the incoming URL from the request
    const targetUrl = decodeURIComponent(req.url.replace('/api/proxy/', ''));
    console.log('Proxying request to:', targetUrl); // Log the target URL for debugging
  
    // Forward the request to the target URL
    req.pipe(
      request(targetUrl)
        .on('error', (err) => {
          console.error('Error forwarding request:', err);
          res.status(500).send({ error: 'Error forwarding request' });
        })
    ).pipe(res);
  });


const dbName = "trilokpropertyconsultant"
const dbUser = process.env.DBUSER
const dbPassword = process.env.DBPASS
try{
  await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vvmocfe.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`)
  console.log("DataBase Connected")
}
catch (e){
    console.log("Error on mongodb:",e)
}

app.get('/', (req, res)=>{
    res.send("Backend is Running")
})

app.listen(PORT, ()=>{
    console.log(`Backend is running on port ${PORT}`)
})