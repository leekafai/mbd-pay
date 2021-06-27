interface data {
    [key: string]: string | number | undefined | null;
}
declare const crypto: (data: data, app_key: string) => string;
export default crypto;
