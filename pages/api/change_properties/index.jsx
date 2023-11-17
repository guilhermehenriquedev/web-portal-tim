import headers from '../headers';

async function setChangeProperties(req, res) {

    let data = req.body

    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/change/properties/`, {
        method: 'POST',
        headers: headers,
        body: data

    })
        .then(response => response.json())

    res.status(201).send()
    
}

export default async function (req, res) {

    if (req.method == 'POST') {
        setChangeProperties(req, res);

    } else {
        res.status(405).send()

    }

}