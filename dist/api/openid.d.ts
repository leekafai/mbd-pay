declare type HTMLString = string;
declare const getOpenid: (target_url: string, app_id: string) => Promise<HTMLString>;
export { getOpenid };
