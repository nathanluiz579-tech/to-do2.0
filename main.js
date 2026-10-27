$(function(){
    // Inicializa o select do Materialize para ele aparecer na tela
    $('select').formSelect();

    $("#botao").click(inserirTarefa);
});

function inserirTarefa(event){
    event.preventDefault();

    var campoTitulo = $(".campoTitulo").val().trim();
    var campoObs = $(".campoObs").val().trim();
    var campoPrioridade = $(".campoPrioridade").val();

    // Validação dos campos
    if(campoTitulo === "" || campoObs === "" || !campoPrioridade){
        $("#mensagem")
            .text("Preencha o título, a observação e selecione a prioridade antes de cadastrar a tarefa.")
            .css("color", "red");
        return;
    }

    var tabela = $(".tarefas").find("tbody");
    var linha = funLinha(campoTitulo, campoObs, campoPrioridade);

    // Eventos dos botões da linha
    linha.find(".botaoDeletar").click(deletaLinha);
    linha.find(".botaoConcluir").click(concluiLinha);

    tabela.append(linha);

    // Mensagem de sucesso solicitada
    $("#mensagem")
        .text("Tarefa adicionada com sucesso!")
        .css("color", "green");

    // Limpar os campos e retornar o cursor para o Título
    $(".campoTitulo").val("");
    $(".campoObs").val("");
    $(".campoPrioridade").val("");
    
    // Atualiza o select do Materialize após limpar
    $('select').formSelect();
    
    $(".campoTitulo").focus();
}

function funLinha(campoTitulo, campoObs, campoPrioridade){
    var linha = $("<tr>");
    var colunaTarefa = $("<td>").text(campoTitulo);
    var colunaObs = $("<td>").text(campoObs);
    var colunaPrioridade = $("<td>").text(campoPrioridade);

    // Coluna Concluir
    var colunaConcluir = $("<td>");
    var bConcluir = $("<a>").addClass("botaoConcluir").attr("href","#");
    var iconeConcluir = $("<i>").addClass("material-icons green-text").text("check_circle");
    bConcluir.append(iconeConcluir);
    colunaConcluir.append(bConcluir);

    // Coluna Apagar
    var colunaDelete = $("<td>");
    var bDeletar = $("<a>").addClass("botaoDeletar").attr("href","#");
    var icone = $("<i>").addClass("material-icons red-text").text("delete");
    bDeletar.append(icone);
    colunaDelete.append(bDeletar);

    linha.append(colunaTarefa);
    linha.append(colunaObs);
    linha.append(colunaPrioridade);
    linha.append(colunaConcluir);
    linha.append(colunaDelete);

    return linha;
}

function concluiLinha(event){
    event.preventDefault();
    $(this).closest("tr").toggleClass("completed");
}

function deletaLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}