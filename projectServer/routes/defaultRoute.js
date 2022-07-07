import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const router = express.Router();

router.get("/*", async (req, res)=>{
    app.use(express.static(path.join(__dirname, '/build')));
})

export default router;

