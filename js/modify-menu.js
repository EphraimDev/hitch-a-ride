$(document).ready(function() {
    $("#added").click(function() {
        alert($("#meal").val() + " has been added")
    });

    $("#modify").click(function() {
        alert($("#meal").val() + " has been modified")
    });

    $("#delete").click(function() {
        alert($("#meal").val() + " has been deleted")
    });
});