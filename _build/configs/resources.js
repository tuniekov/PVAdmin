export default {
    'web': {
        'admin': {
            'pagetitle': 'Админка',
            'alias': 'admin',
            'hidemenu': false,
            'published': true,
            'isfolder': true,
            'searchable': false,
            'cacheable': true,
            'update': true, //обновлять ресурс при установке
            'groups':'', //Добавление в группу ресурсов. Этот ресурс не надо.
            'class_key': 'modDocument',
            'content_type': 1,
            'properties': {
                'templatename': 'adminTemplate',
            },
            'resources': {
                'resources_main': {
                    'pagetitle': 'Ресурсы',
                    'alias': 'resources',
                    'hidemenu': false,
                    'published': true,
                    'isfolder': false,
                    'searchable': false,
                    'cacheable': true,
                    'update': true,
                    'groups': 'administrator',
                    'class_key': 'modDocument',
                    'content_type': 1,
                    'content': "{'!mixVue' | snippet : [\n    'app'=>'pvadmin',\n    'config'=>[\n        'module'=>'PVAdmin'\n    ]\n]}",
                    'properties': {
                        'templatename': 'adminTemplate',
                    },
                },
                'users': {
                    'pagetitle': 'Пользователи',
                    'alias': 'users',
                    'hidemenu': false,
                    'published': true,
                    'isfolder': false,
                    'searchable': false,
                    'cacheable': true,
                    'update': true,
                    'groups': 'administrator',
                    'class_key': 'modDocument',
                    'content_type': 1,
                    'content': "{'!mixVue' | snippet : [\n    'app'=>'pvadmin',\n    'config'=>[\n        'module'=>'UserManagement'\n    ]\n]}",
                    'properties': {
                        'templatename': 'adminTemplate',
                    },
                }
            }
        },
    }
}
