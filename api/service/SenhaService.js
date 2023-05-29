const NotFound = require('../erros/NotFound')
const SenhaRepository = require('../repository/SenhaRepository')

class SenhaService{
    async create(payload){

        const ultimaSenha = await SenhaRepository.pegarUltimaSenha()
        let senha
        if(ultimaSenha){
            senha = ultimaSenha.senha + 1
        }else{
            senha = 1
        }
        const entity = {
            tipoSenha: payload.tipoSenha,
            data: new Date(),
            isFoiChamada: false,
            senha: senha
        }

        await SenhaRepository.create(entity)
    }
    async find(){

        const ultimaSenha = await SenhaRepository.pegarUltimaSenhaChamada()
        let senha 
        if(ultimaSenha){

            const { tipoSenha } = ultimaSenha
    
           if(ultimaSenha.tipoSenha == 'SP'){
                senha = await SenhaRepository.find('SE')
                if(!senha){
                    senha = await SenhaRepository.find('SG')
                    if(!senha){
                        senha = await SenhaRepository.find('SP')
                    }
                }
            }else if(ultimaSenha.tipoSenha == 'SE' || ultimaSenha.tipoSenha == 'SG'){
                senha = await SenhaRepository.find('SP')
                if(!senha){
                    senha = await SenhaRepository.find('SE')
                    if(!senha){
                        senha = await SenhaRepository.find('SG')
                        if(!senha){
                           throw new NotFound()
                        }
                    }
                }
            }else{
                throw new NotFound()
            }
        }else{
            senha = await SenhaRepository.find('SE')
            if(!senha){
                senha = await SenhaRepository.find('SG')
                if(!senha){
                    senha = await SenhaRepository.find('SP')
                    if(!senha){
                        throw new NotFound()
                    }
                }
            } 
        }

        await SenhaRepository.updateIsFoiChamada(senha.id)

        const senhaComp = senha.senha.toString().padStart(2,'0')

        const date = senha.data;
        const year = String(date.getFullYear()).slice(-2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}${month}${day}`;

        const formatSenha = `${formattedDate}-${senha.tipoSenha}${senhaComp}`
        senha.senha = formatSenha
        return senha
    }

    async findAll(){
        const response =  await SenhaRepository.findAll()

        if(!response){
            throw new NotFound()
        }

        response.forEach(element => {
            const senhaComp = element.senha.toString().padStart(2,'0')

            const date = element.data;
            const year = String(date.getFullYear()).slice(-2);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDate = `${year}${month}${day}`;

            const formatSenha = `${formattedDate}-${element.tipoSenha}${senhaComp}`
            element.senha = formatSenha
            return element
        });

        return response
    }
}

module.exports = new SenhaService()