import headers from '../headers';

async function getUsersPerCompany(req, res) {

    const company = req.query.company
    
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/user_company/?company=${company}`, {
        method: 'GET',
        headers: headers
    });

    const json = await result.json();

    res.status(200).json({
        data: json
    });
    
}

export default async function(req, res) {
    
    if (req.method == 'GET'){
        getUsersPerCompany(req, res);

    } else {
        res.status(405).send()

    }

}