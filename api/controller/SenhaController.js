const SenhaService = require('../service/SenhaService')
const ErrorStatus = require('../erros/ErrorStatus');

class SenhaController{
    async create(req, res){
        try {
            await SenhaService.create(req.body);
            return res.status(201).json({ status: 'salvo'});
        }catch (error) {
            console.log(error)
            return res.status(ErrorStatus(error)).json(error);
        }
    }

    async find(req, res){
        try {
            const data = await SenhaService.find();
            return res.status(200).json(data);
        }catch (error) {
            return res.status(ErrorStatus(error)).json(error);
        }
    }

    async findAll(req, res){
        try {
            const data = await SenhaService.findAll()
            return res.status(200).json(data);
        }catch (error) {
            return res.status(ErrorStatus(error)).json(error);
        }
    }

}

module.exports = new SenhaController()