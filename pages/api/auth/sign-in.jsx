import headers from '../headers'

async function signInRequest(req, res) {

    var credenciais = JSON.parse(req.body)

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authenticate/login/?username=${credenciais.email}&password=${credenciais.password}`, {
        method: 'POST',
        headers: headers
    })

    const data = await result.json()
    if (data['is_authenticate']) {

        var payload = {
            "user": {
                "email": credenciais.email,
                "company": data['user_properties']['company'],
                "category": data['user_properties']['category'],
                "name": data['user_properties']['user_name']
            }
        }
        
        res.status(200).json({
            data: payload
        })

    } else {

        res.statusMessage = JSON.stringify({
            "cod": 2,
            "msg": 'Usuario ou senha inválidos!!'
        })

        return res.status(401).send();
    }

}

export default async function (req, res) {

    if (req.method == 'POST') {
        signInRequest(req, res);

    } else {
        res.status(405).send()

    }

}