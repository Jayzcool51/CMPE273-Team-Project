var { JobApplication } = require('./../models/jobApplicantion')
var { Jobs } = require('./../models/jobs'); 

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    var addJobApply = new JobApplication(msg)

    addJobApply.save().then((application) => {
        Jobs.findOneAndUpdate({
            _id: msg.jobId
        }, { $inc: {totalApplicants: 1}  }, function (err, doc) {
            if(err) {
                callback(err,[]);
            }
            else{
                callback(null,"Job applied successfully!");
            }
        })
    }, (err) => {
        callback(err,[]);
    })
}
exports.handle_request = handle_request;
