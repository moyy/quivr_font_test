import { QUIVR_SERVER_URL } from "./setting";
import { current_login_user } from "./user";

export interface ChatInfo {
    chat_id: string,
    chat_name: string,
    creation_time: string,
    user_id: string,
}

export const get_chats = async (): Promise<{ chats: ChatInfo[] }> => {
    if (!current_login_user) {
        throw new Error(`get_chats failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/chat`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });

    return await response.json();
}

export const delete_chat = async (chat_id: string) => {
    if (!current_login_user) {
        throw new Error(`delete_chat failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/chat/${chat_id}`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });

    return await response.json();
}

export const get_chat_history = async (chat_id: string) => {
    if (!current_login_user) {
        throw new Error(`get_chat_history failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/chat/${chat_id}/history`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });

    return await response.json();
}

export interface NewChat {
    chat_id: string,
    chat_name: string,
    creation_time: string,
    history: any,
    user_id: string,
}

export const create_chat = async (name: string): Promise<NewChat> => {
    if (!current_login_user) {
        throw new Error(`create_chat failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/chat`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name }),
    });

    return await response.json();
}

export interface Answer {
    assistant: string,
    chat_id: string,
    message_id: string,
    message_time: string,
    user_message: string,
}

export const add_question = async (chat_id: string, brain_id: string): Promise<Answer> => {
    if (!current_login_user) {
        throw new Error(`add_question failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/chat/${chat_id}/question?brain_id=${brain_id}`;

    const question = {
        model: "gpt-3.5-turbo-0613",
        question: "你现在有哪些文章？",
        temperature: 0.2,
        max_tokens: 1000,
    };

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question),
    });

    return await response.json();
}
