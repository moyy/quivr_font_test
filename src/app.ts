import { create_brain, delete_brain, get_brain_by_id, get_brains, get_default_brain } from "./brain";
import { add_question, create_chat, delete_chat, get_chat_history, get_chats } from "./chat";
import { explore_all, upload_file, explore_delete, explore_file } from "./file";
import { QUIVR_SERVER_URL } from "./setting";
import { login_user, register_user, get_user } from "./user";

// API: IP:5050/
const get_quivr_server_status = async () => {
    const response = await fetch(QUIVR_SERVER_URL);
    return await response.json();
}

const on_user_event = () => {
    let register = document.getElementById('register');
    if (register) {
        register.addEventListener('click', () => {

            let [email, password] = get_email_password();

            register_user(email, password).then((data) => {
                console.log("register_user ok:", data);
            }).catch((error) => {
                console.error("register_user failed, reason = ", error);
            })
        });
    }

    let login = document.getElementById('login');
    if (login) {
        login.addEventListener('click', () => {
            let [email, password] = get_email_password();

            login_user(email, password).then((data) => {
                console.log("login_user ok: ", data);
            }).catch((error) => {
                console.error("login_user failed, reason = ", error);
            })
        });
    }

    let user = document.getElementById('user');
    if (user) {
        user.addEventListener('click', () => {
            let [email, password] = get_email_password();

            get_user().then((data) => {
                console.log("get_user ok: ", data);
            }).catch((error) => {
                console.error("get_user failed, reason = ", error);
            })
        });
    }
}

let temp_brain_name = "Hello, Brain";
let temp_brain: null | { id: string, name: string } = null;

const on_brain_event = () => {
    let elem = document.getElementById('get_brains');
    if (elem) {
        elem.addEventListener('click', () => {
            get_brains().then((data) => {
                console.log("get_brains ok:", data);
            }).catch((error) => {
                console.error("get_brains failed, reason = ", error);
            })
        });
    }

    elem = document.getElementById('get_default_brain');
    if (elem) {
        elem.addEventListener('click', () => {
            get_default_brain().then((data) => {
                console.log("get_default_brain ok:", data);
            }).catch((error) => {
                console.error("get_default_brain failed, 请先登录，reason = ", error);
            })
        });
    }

    elem = document.getElementById('create_brain');
    if (elem) {
        elem.addEventListener('click', () => {
            create_brain(temp_brain_name).then((data) => {
                temp_brain = data;
                console.log("create_brain ok:", data);
            }).catch((error) => {
                console.error("create_brain failed, 请先登录，reason = ", error);
            })
        });
    }

    elem = document.getElementById('get_brain_by_id');
    if (elem) {
        elem.addEventListener('click', () => {
            if (!temp_brain) {
                console.error("get_brain_by_id failed, temp_brain is null");
                return;
            }

            get_brain_by_id(temp_brain.id).then((data) => {
                console.log("get_brain_by_id ok:", data);
            }).catch((error) => {
                console.error("get_brain_by_id failed, reason = ", error);
            })
        });
    }

    elem = document.getElementById('delete_brain');
    if (elem) {
        elem.addEventListener('click', () => {
            if (!temp_brain) {
                console.error("delete_brain failed, temp_brain is null");
                return;
            }

            delete_brain(temp_brain.id).then((data) => {
                temp_brain = null;
                console.log("delete_brain ok:", data);
            }).catch((error) => {
                console.error("delete_brain failed, reason = ", error);
            })
        });
    }
}

// Upload & Explore
let file_name: null | string = null;
const on_file_event = () => {

    let elem = document.getElementById('upload_file');
    if (elem) {
        elem.addEventListener('click', () => {
            if (!temp_brain) {
                console.error("upload_file failed, temp_brain is null, 请创建大脑（非默认的大脑）");
                return;
            }

            let input = document.getElementById('select_file') as HTMLInputElement;
            if (!input) {
                console.error("upload_file failed, input is null，请选择一个文件");
                return;
            }
            if (!input.files || !input.files[0]) {
                console.error("upload_file failed, input.files is null，请选择一个文件");
                return;
            }

            let file = input?.files[0];
            file_name = file.name;
            let formData = new FormData();
            formData.append('uploadFile', file);

            upload_file(temp_brain.id, formData).then((data) => {
                console.log("upload_file ok:", data);
            }).catch((error) => {
                console.error("upload_file failed, reason = ", error);
            })
        });
    }

    elem = document.getElementById('explore_all');
    if (elem) {
        elem.addEventListener('click', () => {
            if (!temp_brain) {
                console.error("explore_all failed, temp_brain is null, 请创建大脑（非默认的大脑）");
                return;
            }

            explore_all(temp_brain.id).then((data) => {
                console.log("explore_all ok:", data);
            }).catch((error) => {
                console.error("explore_all failed, reason = ", error);
            })
        });
    }

    elem = document.getElementById('explore_file');
    if (elem) {
        elem.addEventListener('click', () => {
            if (!temp_brain) {
                console.error("explore_file failed, temp_brain is null, 请创建大脑（非默认的大脑）");
                return;
            }
            if (!file_name) {
                console.error("explore_file failed, file_name is null, 请先上传一个文件");
                return;
            }

            explore_file(file_name, temp_brain.id).then((data) => {
                console.log("explore_file ok:", data);
            }).catch((error) => {
                console.error("explore_file failed, reason = ", error);
            })
        });
    }

    elem = document.getElementById('explore_delete');
    if (elem) {
        elem.addEventListener('click', () => {
            if (!temp_brain) {
                console.error("explore_delete failed, temp_brain is null, 请创建大脑（非默认的大脑）");
                return;
            }
            if (!file_name) {
                console.error("explore_delete failed, file_name is null, 请先上传一个文件");
                return;
            }
            explore_delete(file_name, temp_brain.id).then((data) => {
                file_name = null;
                console.log("explore_delete ok:", data);
            }).catch((error) => {
                console.error("explore_delete failed, reason = ", error);
            })
        });
    }

}

const on_crawl_event = () => {
}

let current_chat_id: null | string = null;
const on_chat_event = () => {
    let element = document.getElementById('get_chats');
    if (element) {
        element.addEventListener('click', () => {
            get_chats().then((data) => {
                console.log("get_chats ok:", data);
            }).catch((error) => {
                console.error("get_chats failed, reason = ", error);
            })
        });
    }

    element = document.getElementById('create_chat');
    if (element) {
        element.addEventListener('click', () => {
            create_chat("new Chat").then((data) => {
                current_chat_id = data.chat_id;
                console.log("create_chat ok:", data);
            }).catch((error) => {
                console.error("create_chat failed, reason = ", error);
            })
        });
    }

    element = document.getElementById('delete_chat');
    if (element) {
        element.addEventListener('click', () => {
            
            if (!current_chat_id) {
                console.error("delete_chat failed, current_chat_id is null");
                return;
            }

            delete_chat(current_chat_id).then((data) => {
                console.log("delete_chat ok:", data);
            }).catch((error) => {
                console.error("delete_chat failed, reason = ", error);
            })
        });
    }

    element = document.getElementById('get_chat_history');
    if (element) {
        element.addEventListener('click', () => {
            if (!current_chat_id) {
                console.error("get_chat_history failed, current_chat_id is null");
                return;
            }
            get_chat_history(current_chat_id).then((data) => {
                console.log("get_chat_history ok:", data);
            }).catch((error) => {
                console.error("get_chat_history failed, reason = ", error);
            })
        });
    }

    element = document.getElementById('add_question');
    if (element) {
        element.addEventListener('click', () => {
            if (!current_chat_id) {
                console.error("add_question failed, current_chat_id is null");
                return;
            }

            if (!temp_brain) {
                console.error("add_question failed, temp_brain is null, 请创建大脑（非默认的大脑）");
                return;
            }

            add_question(current_chat_id, temp_brain.id).then((data) => {
                console.log("add_question ok:", data);
            }).catch((error) => {
                console.error("add_question failed, reason = ", error);
            })
        });
    }
}

console.log('Finish DOM loaded, Start App !');

// 测试 Quivr 服务器 状态
get_quivr_server_status().then((data) => {
    console.log(`get_quivr_server_status ok: ${JSON.stringify(data)}`);
}).catch((error) => {
    console.error("get_quivr_server_status failed, reason = ", error);
});

on_user_event();
on_brain_event();
on_file_event();
on_crawl_event();
on_chat_event();

const get_email_password = (): [string, string] => {

    let emailElement = document.getElementById("email")
    let passwordElement = document.getElementById("password");

    if (!emailElement || !passwordElement) {
        throw new Error(`HTML Element email or password is null, emailElement = ${emailElement}, passwordElement = ${passwordElement}`);
    }

    let email = (emailElement as HTMLInputElement).value;
    let password = (passwordElement as HTMLInputElement).value;

    return [email, password];
}