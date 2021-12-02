
let globalTaskData=[];
taskContents=document.getElementById("taskContents");




const addcard = ()=>{
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        title: document.getElementById("tasktitle").value,
        type: document.getElementById("tasktype").value,
        description : document.getElementById("textarea").value
    };
    taskContents=document.getElementById("taskContents");

    taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
    
}





const generateTaskCard = ({id,url,title,type,description}) =>
    `<div class="col-md-6 col-lg-4 mt-5" id=${id} key=${id}>
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-end">
                    <button type="button" onclick="editCard(this)" name=${id} class="btn btn-outline-info">
                        <i class="far fa-edit"></i>
                    </button>
                    <button type="button" onclick="deleteTask(this)" name=${id} class="btn btn-outline-danger">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <img src="${url}" class="card-img-top" alt="Image">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">
                    ${description}
                </p>
                <span class="badge bg-primary">${type}</span>

            </div>
            <div class="card-footer ">
                <button class="btn btn-outline-primary float-end">
                OPEN TASK
                </button>

            </div>
        </div>
    </div>`





    const saveToLocalStorage=()=>{
        localStorage.setItem("tasky",JSON.stringify({tasks: globalTaskData}));
    }



    const reloadTaskCard=()=>{
        const localStorageCopy=JSON.parse(localStorage.getItem("tasky"));
        if(localStorageCopy)
        {
            globalTaskData=localStorageCopy.tasks;
        }

        globalTaskData.map((cardData)=>{
            taskContents.insertAdjacentHTML('beforeend',generateTaskCard(cardData));
        })
    }


    const deleteTask=(e)=>{
        const targetId=e.getAttribute("name");
        globalTaskData= globalTaskData.filter((cardData)=> cardData.id!=targetId);
        saveToLocalStorage();
        window.location.reload();
    }



    const editCard=(e)=>{
        const targetId=e.getAttribute("name");
        e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true");
        e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true");
        e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true");
        saveToLocalStorage();
        e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML="SAVE CHANGES";
        e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEditTask(this)");

       // saveToLocalStorage();
        //window.location.reload();
    }


    const saveEditTask=(e)=>{
        


    }