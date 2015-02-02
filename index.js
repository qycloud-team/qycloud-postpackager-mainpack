'use strict';

/**
 * 处理在-pm模式下, 诸如app/support/main, app/login/main文件加载错误的问题. 该问题是因为在map.json中main指向的位置还是app/目录下
 * , 而不是sea-module/app/目下下的main文件导致的
 *
 * @param ret
 * @param settings
 * @param conf
 * @param opt
 */
module.exports = function (ret, settings, conf, opt) {
    fis.util.map(ret.src, function (subpath, file) {
        if (file.isHtmlLike && opt.pack) {

            var re = /['"](app\/(\w*)\/main)['"]/g,
                m;

            while ((m = re.exec(file.getContent())) != null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                var moduleUri = m[1],
                    moduleName = m[2];

                var moduleConfig = ret.map.res[moduleUri];
                var pkgConfig = ret.map.pkg[moduleConfig.pkg];
                moduleConfig.uri = pkgConfig.uri;
            }
        }
    });
};