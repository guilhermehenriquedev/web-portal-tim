
async function recoverUserInformation(req, res) {

    var token = JSON.parse(JSON.parse(req.body))

    var static_payload = {
        user: {
            email: token.email,
            company: token.company,
            category: token.category,
            name: token.name ,
        },
        perms: {}
    }

    const json = await static_payload;

    res.status(200).json({
        data: json
    });

}

export default async function (req, res) {

    if (req.method == 'POST') {
        recoverUserInformation(req, res);

    } else {
        res.status(405).send()

    }

}