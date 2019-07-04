export default {
    is_prod: process.env.NODE_ENV === 'production',
    app_name: process.env.APP_NAME,
    app_title: process.env.APP_TITLE,
    app_version: process.env.APP_VERSION,
    app_copyright: 'Powered By 零壹进制网络',
    dev_server_url: `http://test.01snt.com:82/admin`,
    server_url: `http://${location.hostname}:82/admin`
}
