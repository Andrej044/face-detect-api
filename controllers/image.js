const returnClarifaiRequestOptions = (url) => {
  const PAT = '1b43454f514e47ed9fc75b63f48df8a7';
  const USER_ID = 'andrej044';       
  const APP_ID = 'smart-brain';
  // const MODEL_ID = 'face-detection';
  const IMAGE_URL = url;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;
}

const apiCallHandler = (req, res) => {
  fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(response => response.json())
    .then(data => data.outputs[0].data.regions)
    .then(data => res.json(data))
    .catch(err=> res.status(400).json("Unable to work with API"))
} 



const imageHandler = (req, res, db) =>{
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries)
  })
  .catch(err => res.status(400).json("Unable to get entries")) 

}

module.exports= {
  imageHandler: imageHandler,
  apiCallHandler:apiCallHandler
}