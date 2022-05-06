import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
        "_id": {
          "type": "ObjectId"
        },
        "Nº OS": {
          "type": "String"
        },
        "Status": {
          "type": "String"
        },
        "Urgência": {
          "type": "String"
        },
        "Momento da solicitação": {
          "type": "String"
        },
        "Bandeira da chamada": {
          "type": "String"
        },
        "Categoria": {
          "type": "String"
        },
        "Nome do passageiro": {
          "type": "String"
        },
        "Telefone do passageiro": {
          "type": "String"
        },
        "Telefone de cadastro": {
          "type": "String"
        },
        "Local de embarque": {
          "type": "String"
        },
        "Cidade": {
          "type": "String"
        },
        "Posição do local de embarque alterada pelo operador": {
          "type": "String"
        },
        "Destino informado": {
          "type": "String"
        },
        "Forma de pagamento": {
          "type": "String"
        },
        "Empresa": {
          "type": "String"
        },
        "Qtd": {
          " Destinos": {
            "type": "String"
          }
        },
        "Retorno": {
          "type": "String"
        },
        "Motorista especificado": {
          "type": "String"
        },
        "Estimativa de distância da corrida (KM)": {
          "type": "String"
        },
        "Estimativa de tempo da corrida (Min)": {
          "type": "String"
        },
        "Nome da Tarifa": {
          "type": "String"
        },
        "Estimativa do valor da corrida": {
          "type": "String"
        },
        "Momento do aceite": {
          "type": "String"
        },
        "Bandeira da corrida": {
          "type": "String"
        },
        "Motorista": {
          "type": "String"
        },
        "Telefone do motorista": {
          "type": "String"
        },
        "Estimativa de distância até o passageiro no aceite (KM)": {
          "type": "String"
        },
        "Estimativa de tempo até o passageiro no aceite (min)": {
          "type": "String"
        },
        "Momento que o motorista registrou chegada ao local de embarque": {
          "type": "String"
        },
        "Momento que o GPS registrou chegada aos arredores do local de embarque": {
          "type": "String"
        },
        "Momento que o motorista registrou início da corrida": {
          "type": "String"
        },
        "Distância realizada até o passageiro no aceite (KM)": {
          "type": "String"
        },
        "Tempo realizado até o passageiro no aceite (min)": {
          "type": "String"
        },
        "Momento que o motorista registrou o encerramento": {
          "type": "String"
        },
        "Local de encerramento": {
          "type": "String"
        },
        "Distância do início da corrida até o local de encerramento": {
          "type": "String"
        },
        "Tempo do início da corrida até o local de encerramento": {
          "type": "String"
        },
        "Valor da corrida": {
          "type": "String"
        },
        "Motivo do cancelamento": {
          "type": "String"
        },
        "Forma de disparo": {
          "type": "String"
        },
        "Operador": {
          "type": "String"
        },
        "PA/Área": {
          "type": "String"
        },
        "PA/Área descoberto": {
          "type": "String"
        },
        "Informação interna": {
          "type": "String"
        },
        "Fez eleição antes de definir vencedor": {
          "type": "String"
        },
        "Endereço da parada 1": {
          "type": "String"
        },
        "Cidade da parada 1": {
          "type": "String"
        }
})

const Order = mongoose.model("Order", OrderSchema);

export default Order;