// API: Get IP:5050/brains

import { QUIVR_SERVER_URL } from "./setting";
import { current_login_user } from "./user";

export interface BrainInfo {
    id: string;
    name: string;
}

// 取 现有的大脑
export const get_brains = async (): Promise<BrainInfo[]> => {
    if (!current_login_user) {
        throw new Error(`get_brains failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/brains`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    let r = await response.json();

    return r.brains;
}

// 取 默认大脑
export const get_default_brain = async (): Promise<BrainInfo> => {
    if (!current_login_user) {
        throw new Error(`get_default_brain failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/brains/default`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}

// 取 默认大脑
export const get_brain_by_id = async (id: string): Promise<BrainInfo> => {
    if (!current_login_user) {
        throw new Error(`get_brain_by_id failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/brains/${id}`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}

// 新建 Brain
export const create_brain = async (name: string): Promise<BrainInfo> => {
    if (!current_login_user) {
        throw new Error(`create_brain failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/brains`;

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

// 删除 Brain
export const delete_brain = async (id: string) => {
    if (!current_login_user) {
        throw new Error(`delete_brain failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/brains/${id}`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}

