const SenhaService = require('../service/SenhaService')

class SenhaController{
    async create(req, res){
        try {
            await SenhaService.create(req.body);
            return res.status(201).json({ status: 'salvo'});
        }catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    }

    async find(req, res){
        try {
            const { tipoSenha } = req.params;
            const data = await SenhaService.find(tipoSenha);
            return res.status(201).json(data);
        }catch (error) {
            return res.status(500).json(error);
        }
    }

    async findAll(req, res){
        try {
            const data = await SenhaService.findAll()
            return res.status(201).json(data);
        }catch (error) {
            return res.status(500).json(error);
        }
    }

}

module.exports = new SenhaController()