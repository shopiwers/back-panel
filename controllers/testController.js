const prueba_test = async function (req, res) {
    console.log('Hola test');
    res.status(200).send({
        messaje: 'test mesasje'
    })

}

module.exports = {
    prueba_test
}