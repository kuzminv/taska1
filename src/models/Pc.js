import 'isomorphic-fetch';
import {_} from 'lodash';

String.prototype.trimLeft = function(charlist) {
    if (charlist === undefined)
        charlist = "\s";
    return this.replace(new RegExp("^[" + charlist + "]+"), "");
};

String.prototype.trimRight = function(charlist) {
    if (charlist === undefined)
        charlist = "\s";
    return this.replace(new RegExp("[" + charlist + "]+$"), "");
};

export default class PcModel
{
    constructor(model)
    {
        this.model = model;
    };

    findProperty(path)
    {
        const pathFormated = path.trimLeft('/').trimRight('/');
        let nodes = [];
        if (pathFormated != '') {
            nodes = pathFormated.split('/');
        };
        return this.findModelPropertyRecursive(this.model, nodes);
    };

    findModelPropertyRecursive(model, nodes)
    {
        if (nodes.length === 0) {
            return model;
        };

        const node = nodes.slice(0, 1)[0];
        const type = typeof model;
        const isScalar = type === 'string' || type === 'number' || type === 'boolean';

        if (_.isArray(model)) {
            if (!isNaN(parseInt(node))) {
                return this.findModelPropertyRecursive(model[node], nodes.slice(1));
            } else {
                return undefined;
            }
        } else if (isScalar) {
            return undefined;
        } else if (_.has(model, node)) {
            return this.findModelPropertyRecursive(model[node], nodes.slice(1));
        } else {
            return undefined;
        };
    };

    volumes()
    {
        const sum = {};
        this.model.hdd.forEach((hdd) => {
            if (isNaN(sum[hdd.volume])) {
                sum[hdd.volume] = 0;
            };
            sum[hdd.volume] += parseInt(hdd.size);
        });

        const sumFormated = {};
        for (let volumeName in sum) {
            if (sum.hasOwnProperty(volumeName)) {
                sumFormated[volumeName] = sum[volumeName] + 'B';
            };
        };
        return sumFormated;
    };
};
