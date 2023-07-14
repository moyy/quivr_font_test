import { create_brain, delete_brain, get_brain_by_id, get_brains, get_default_brain } from "./brain";
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
                console.error("get_default_brain failed, reason = ", error);
            })
        });
    }

    let temp_brain_name = "Hello, Brain";
    let temp_brain: null | { id: string, name: string } = null;

    elem = document.getElementById('create_brain');
    if (elem) {
        elem.addEventListener('click', () => {
            create_brain(temp_brain_name).then((data) => {
                temp_brain = data;
                console.log("create_brain ok:", data);
            }).catch((error) => {
                console.error("create_brain failed, reason = ", error);
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
const on_file_event = () => {
}

const on_crawl_event = () => {
}

const on_chat_event = () => {
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