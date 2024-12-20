const router=require('express').Router();
const {updateByUserName,findAll,
    findOnebyid,findOnebyusername,
    addNew, updateByid, deleteByid}=require('../controllers/user.controller.js');



router.get('/',findAll);
router.post('/',addNew);
router.get('/username/:username',findOnebyusername);
router.get('/:id',findOnebyid);

router.put('/:id',updateByid);
router.put('/username1/:username',updateByUserName);
router.delete('/:id',deleteByid);

module.exports=router;