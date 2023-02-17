<style>
.required {
    color: red
}
.success {
    color: green
}
.fail {
    color: red
}
</style>
<script type="module">
import axios from 'axios';

let url = 'https://api.counter.plantree.me';

function validateNamespace(namespace) {
    if (namespace === '' || namespace.includes('@')) {
        alert("Need a namespce without @");
        return false;
    }
    return true;
}

function validateNamespaceSecretKey(namespace, secret, key) {
    if (namespace === '' || namespace.includes('@') || secret === '' 
        || key === '') {
        alert("Need a namespce without @, secret and a key");
        return false;
    }
    return true;
}

function validateNamespaceSecretKeyValue(namespace, secret, key, value) {
    if (namespace === '' || namespace.includes('@') || secret === '' 
        || key === '' || value === '' || isNaN(parseInt(value))) {
        alert("Need a namespce without @, secret, key and a valid value (integer)");
        return false;
    }
    return true;
}

export default {
    data() {
        return {
            namespaceCount: -1,
            keyCount: -1,
            requestCount: -1,

            createNamespace: '',
            createSecret: '',
            createResponse: '',
            createStatus: false,

            resetNamespace: '',
            resetSecret: '',
            resetKey: '',
            resetValue: '',
            resetResponse: '',
            resetStatus: false,

            deleteNamespace: '',
            deleteSecret: '',
            deleteKey: '',
            deleteResponse: '',
            deleteStatus: false,

            getNamespace: '',
            getKey: '',
            getResponse: '',
            getStatus: false,
        }
    },
    methods: {
        async updateNamespaceCount() {
            try {
                const response = await axios.get(url + '/pv/statistics/count-namespaces');
                if (response.status === 200 && response.data.code === 0) {
                    this.namespaceCount = response.data.data[0].value;
                }   
            } catch (error) {
                console.log(error);
            }
        },
        async updateKeyCount() {
            try {
                const response = await axios.get(url + '/pv/statistics/count-keys');
                if (response.status === 200 && response.data.code === 0) {
                    this.keyCount = response.data.data[0].value;
                }   
            } catch (error) {
                console.log(error);
            }
        },
        async updateRequestCount() {
            try {
                const response = await axios.get(url + '/pv/statistics/count-requests');
                if (response.status === 200 && response.data.code === 0) {
                    this.requestCount = response.data.data[0].value;
                }   
            } catch (error) {
                console.log(error);
            }
        },
        async pvCreate() {
            try {
                if (!validateNamespace(this.createNamespace)) {
                    return;
                }
                const response = await axios.post(`${url}/pv/create?namespace=${this.createNamespace}`);
                this.createResponse = response.data;
                this.createStatus = true;
            } catch (error) {
                console.log(error);
                this.createResponse = error.response.data;
                this.createStatus = false;
            } 
        },
        async pvReset() {
            try {
                if (!validateNamespaceSecretKeyValue(this.resetNamespace, this.resetSecret,
                    this.resetKey, this.resetValue)) {
                    return;
                }
                const response = await axios.post(`${url}/pv/reset?namespace=${this.resetNamespace}` + 
                    `&secret=${this.resetSecret}&key=${this.resetKey}&value=${this.resetValue}`);
                this.resetResponse = response.data;
                this.resetStatus = true;
            } catch (error) {
                console.log(error);
                this.resetResponse = error.response.data;
                this.resetStatus = false;
            } 
        },
        async pvDelete() {
            try {
                if (!validateNamespaceSecretKey(this.deleteNamespace, this.deleteSecret, this.deleteKey)) {
                    return;
                }
                const response = await axios.post(`${url}/pv/delete?namespace=${this.deleteNamespace}` + 
                    `&secret=${this.deleteSecret}&key=${this.deleteKey}`);
                this.deleteResponse = response.data;
                this.deleteStatus = true;
            } catch (error) {
                console.log(error);
                this.deleteResponse = error.response.data;
                this.deleteStatus = false;
            } 
        },
        async pvGet() {
            try {
                if (!validateNamespace(this.getNamespace)) {
                    return;
                }
                const response = await axios.get(`${url}/pv/get?namespace=${this.getNamespace}&key=${this.getKey}`);
                this.getResponse = response.data;
                this.getStatus = true;
            } catch (error) {
                console.log(error);
                this.getResponse = error.response.data;
                this.getStatus = false;
            } 
        },
    },
    mounted() {
        this.updateNamespaceCount();
        this.updateKeyCount();
        this.updateRequestCount();
    }
}
</script>

## Usage

[[toc]]

### 0. Counter API

This API provides **a service about PV and UV**, which allows you:

- Create **your own namespace** with a secret
- Get values of given keys or all of the keys under your namespace
- **Automatically initialize and manually increment** keys under your namespace
- **Reset** the value of keys
- **Delete** keys or waiting to expire after **three months**

Currently statistics info:

| item      | value |
| --------- | ----- |
| namespaces |   <span>{{ namespaceCount }}</span>    |
| keys     | <span>{{ keyCount }}</span> |
| requests |   <span>{{ requestCount }}</span>    |

### 1. Management Panel

##### 1.1 /pv/create

::: tip
create your own namespace, normally using **domain name**.
:::

<p><strong>Request:</strong></p>

<p><label for="createNamespace">Create a Namespace: </label><input id="createNamespace" v-model="createNamespace" required><span class="required"> *</span></p>
<p><label for="createSecret">With a Secret: </label><input type="password" id="createSecret" v-model="createSecret" placeholder="default as namespace"></p>

<button @click="pvCreate">Create</button>

<p><strong>Response:</strong></p>

<p v-bind:class="[createStatus ? 'success' : 'fail' ]">{{ createResponse }}</p>

##### 1.2 /pv/reset

::: tip
reset the given key under your namespace. Of course, with your secret.
:::

<p><strong>Request:</strong></p>

<p><label for="resetNamespace">Provide a Namespace: </label><input id="resetNamespace" v-model="resetNamespace"><span class="required"> *</span></p>
<p><label for="resetSecret">With a Secret: </label><input id="resetSecret" v-model="resetSecret"><span class="required"> *</span></p>
<p><label for="resetKey">Provide a Key: </label><input id="resetKey" v-model="resetKey" placeholder="update old and create new"><span class="required"> *</span></p>
<p><label for="resetValue">Provide a Value: </label><input id="resetValue" v-model="resetValue"><span class="required"> *</span></p>

<button @click="pvReset">Reset</button>

<p><strong>Response:</strong></p>

<p v-bind:class="[resetStatus ? 'success' : 'fail' ]">{{ resetResponse }}</p>

##### 1.3 /pv/delete

::: tip
delete the given key under your namespace. Of course, with your secret.
:::

<p><strong>Request:</strong></p>

<p><label for="deleteNamespace">Provide a Namespace: </label><input id="deleteNamespace" v-model="deleteNamespace"><span class="required"> *</span></p>
<p><label for="deleteSecret">With a Secret: </label><input id="deleteSecret" v-model="deleteSecret"><span class="required"> *</span></p>
<p><label for="deleteKey">Provide a Key: </label><input id="deleteKey" v-model="deleteKey"><span class="required"> *</span></p>

<button @click="pvDelete">Delete</button>

<p><strong>Response:</strong></p>

<p v-bind:class="[deleteStatus ? 'success' : 'fail' ]">{{ deleteResponse }}</p>

##### 1.4 /pv/get

::: tip
get keys under a given namespace
:::

<p><strong>Request:</strong></p>

<p><label for="getNamespace">Provide a Namespace: </label><input id="getNamespace" v-model="getNamespace"><span class="required"> *</span></p>
<p><label for="getKey">Provide a Key: </label><input id="getKey" v-model="getKey" placeholder="without will return all"></p>

<button @click="pvGet">Get</button>

<p><strong>Response:</strong></p>

<p v-bind:class="[getStatus ? 'success' : 'fail' ]">{{ getResponse }}</p>

### 2. API definition

Full documentation could be found here: [https://app.swaggerhub.com/apis/plantree/counter/1.0.0#/developers/createPvNamespace](https://app.swaggerhub.com/apis/plantree/counter/1.0.0#/developers/createPvNamespace).

#### 2.1 /pv/get

##### GET

##### Description:

By passing parameters, you can get status of given key in given namespace


##### Parameters

| Name      | Located in | Description                                                  | Required | Schema |
| --------- | ---------- | ------------------------------------------------------------ | -------- | ------ |
| namespace | query      | namespace to get status                                      | Yes      | string |
| key       | query      | key to get status (without this parameter will return all keys under the namespace) | No       | string |

##### Responses

| Code | Description                   |
| ---- | ----------------------------- |
| 200  | get status of PV successfully |
| 400  | bad input parameter           |
| 500  | internal server error         |

#### 2.2 /pv/create

##### POST
##### Description:

By passing parameters, you can create a namespace for PV with an secret


##### Parameters

| Name      | Located in | Description                                                  | Required | Schema |
| --------- | ---------- | ------------------------------------------------------------ | -------- | ------ |
| namespace | query      | namespace to create                                          | Yes      | string |
| secret    | query      | secret is needed when you want to reset/delete the value (default the same as namepsace) | No       | string |

##### Responses

| Code | Description                         |
| ---- | ----------------------------------- |
| 200  | create namespace of PV successfully |
| 400  | bad input parameter                 |
| 500  | internal server error               |

#### 2.3 /pv/increment

##### POST
##### Description:

By passing parameters, you can increment PV by 1 of given key in given namespace (will initialize automatically)


##### Parameters

| Name      | Located in | Description                 | Required | Schema |
| --------- | ---------- | --------------------------- | -------- | ------ |
| namespace | query      | namespace to be incremented | Yes      | string |
| key       | query      | key to be incremented       | Yes      | string |

##### Responses

| Code | Description               |
| ---- | ------------------------- |
| 200  | increment PV successfully |
| 400  | bad input parameters      |
| 500  | internal server error     |

#### 2.4 /pv/reset

##### POST
##### Description:

By passing parameters, you can reset PV of given key in given namespace with given value


##### Parameters

| Name      | Located in | Description              | Required | Schema  |
| --------- | ---------- | ------------------------ | -------- | ------- |
| namespace | query      | namespace to be reset    | Yes      | string  |
| secret    | query      | secret                   | Yes      | string  |
| key       | query      | key to be reset          | Yes      | string  |
| value     | query      | number of PV to be reset | Yes      | integer |

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | reset PV successfully |
| 400  | bad input parameters  |
| 500  | internal server error |

#### 2.5 /pv/delete

##### POST
##### Description:

By passing parameters, you can delete of given key or given namespace


##### Parameters

| Name      | Located in | Description            | Required | Schema |
| --------- | ---------- | ---------------------- | -------- | ------ |
| namespace | query      | namespace to be delete | Yes      | string |
| secret    | query      | secret                 | Yes      | string |
| key       | query      | key to be delete       | Yes      | string |

##### Responses

| Code | Description            |
| ---- | ---------------------- |
| 200  | delete PV successfully |
| 400  | bad input parameters   |
| 500  | internal server error  |

### 3. Example

#### 3.1 Using axios

```javascript
try {
    const response = await axios.get("https://api.counter.plantree.me/pv/get?namespace=mysite.com&key=index.html");
    if (response.status === 200 && response.data.code === 0) {
        console.log(response.data);
    }   
} catch (error) {
    console.log(error)
}
```

