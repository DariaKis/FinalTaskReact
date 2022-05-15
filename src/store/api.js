
const url = 'http://93.95.97.34/api';

const request = async (url, method = 'GET', body) => {
    const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-type': 'application/json',
        })
    });
    return await response.json();
};


export const getAllTasks=(filter, page)=>{
    return request(`${url}/tasks`, "POST",{filter,page,limit:10});
};
export const addTask = (data) => {
    const taskData = {
        ...data,
    };
    return request(`${url}/tasks/createOrEdit`, 'PUT', taskData);
};

export const deleteTask = (id) => {
    return request(`${url}/tasks/${id}`, 'DELETE');
};

export const addTaskTime = (id,data) => {
    return request(`${url}/tasks/${id}/worktime`, 'PATCH',data);
};



export const addTaskStatus = (id,status) => {

    return request(`${url}/tasks/${id}/status/${status}`, 'PATCH');
};

export const getTaskById = (id) => {

    return request(`${url}/tasks/${id}`, 'GET');
};

export const getUsersByPage = (page,limit=0) => {
    return request(`${url}/users`, "POST", {filter:{}, page, limit});
};

export const getAllUsers = () => {
    return request(`${url}/users/all`, );
};
export const editUser = (data) => {
    return request(`${url}/users/edit`, 'PUT', data);
};


export const getAllComments = (id) => {
    return request(`${url}/comments/${id}`);
};

export const addComment = (data) => {
    return request(`${url}/comments/createOrEdit`, 'PUT', data);
};
export const deleteComment = (id) => {
    return request(`${url}/comments/${id}`, 'DELETE');
};