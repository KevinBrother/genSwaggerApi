
import {getApi} from '../genApi'

getApi('mber/updateTrainNumberPosition')
// getApi('photo/insertTrainNumberPhoto')
// getApi('/photo/listPlPhoto')
// getApi('/vessel/listByPage')
.then(rst => {
    console.log('-----------------------------',rst);
})
