import { Controller } from './../common/controller';

export class DeviceController implements Controller {

    constructor(server) {
        this.init(server);
    }

    private init(server): void {

        server.get({ path: '/getDevices', platform: 'Default' }, function (req, res, next) {
            var platformVersion = req.params.platform || 'platform';
            req.log.debug('platformVersion is "%s"', platformVersion);

            var AWS = require("aws-sdk");

            AWS.config.update({
                region: "us-east-1"
            });

            var docClient = new AWS.DynamoDB.DocumentClient();

            console.log("Querying for all devices");

            var params = {
                TableName : "PSS-PF-NA-DEV-DEVICES",
                ExpressionAttributeValues: {
                    "PartnerName": "common"
                }
            };

            docClient.query(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Query succeeded.");
                    data.Items.forEach(function(item) {
                        console.log(" -", item.model + ": " + item.make);
                    });
                }
            });

            return next();
        });

    }

}
