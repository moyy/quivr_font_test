// Upload & Explore

import { QUIVR_SERVER_URL } from "./setting";
import { current_login_user } from "./user";

// upload
export const upload_file = async (brain_id: string, form: FormData) => {
    if (!current_login_user) {
        throw new Error(`upload_file failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/upload?brain_id=${brain_id}`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: form,
    });

    return await response.json();
}

export interface FileInfo {
    name: string, 
    size: number,
}

export interface FileContent {
    content: string,
    file_extension: null | string,
    file_name: string,
    file_size: string, // "number"
    file_url: null | string,
}

// explore
export const explore_all = async (brain_id: string): Promise<{documents: FileInfo[]}> => {
    if (!current_login_user) {
        throw new Error(`explore_all failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/explore/?brain_id=${brain_id}`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}

// explore
export const explore_file = async (name: string, brain_id: string): Promise<{documents: FileContent[]}> => {
    if (!current_login_user) {
        throw new Error(`explore_file failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/explore/${name}?brain_id=${brain_id}`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}

// explore
export const explore_delete = async (name: string, brain_id: string) => {
    if (!current_login_user) {
        throw new Error(`explore_all failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/explore/${name}?brain_id=${brain_id}`;

    const token = current_login_user.access_token;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}