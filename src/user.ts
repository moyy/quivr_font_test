import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { QUIVR_SERVER_URL, SUPABASE_ANON_KEY, SUPABASE_URL } from "./setting";

export const register_user = async (email: string, password: string) => {
    const { data, error } = await get_client().auth.signUp({
        email, password,
    });

    if (error) {
        throw new Error(`register_user failed, error = ${error}`);
    }

    return data;
}

export const login_user = async (email: string, password: string) => {

    const {data, error} = await get_client().auth.signInWithPassword({
        email, password,
    });

    if (error) {
        throw new Error(`login_user failed, error = ${error}`);
    }

    current_login_user = {
        email: data?.user?.email || '',
        user_id: data?.user?.id || '',
        access_token: data?.session?.access_token || '',
    };

    console.log(`current_login_user = `, current_login_user);

    // 注：可以将 当前用户的必要信息 保存到 localStorage 中，以便下次自动登录
    // localStorage.setItem('current_login_user', JSON.stringify(current_login_user));

    return data;
}

// API: IP:5050/user
// 取 用户信息
export const get_user = async (): Promise<UserInfo> => {
    if (!current_login_user) {
        throw new Error(`get_user failed, current_login_user is null`);
    }

    const url = `${QUIVR_SERVER_URL}/user`;

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

export interface UserInfo {
    current_brain_size: number;
    date: string; // "20230714"
    email: string,
    max_brain_size: number; // 52428800
    max_requests_number: "number"; // "200"
    requests_stats: []
}

export interface LoginUser {
    email: string;
    user_id: string;
    access_token: string;
};

// 当前用户信息
export let current_login_user: null | LoginUser = null;

// supabase 客户端
let supabase: null | SupabaseClient = null;
const get_client = (): SupabaseClient => {
    if (!supabase) {
        supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabase;
}