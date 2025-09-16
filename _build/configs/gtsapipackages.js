export default {
    pvadmin:{
        name:'pvadmin', //имя пакета MODX
        gtsAPITables:{
            modResourceTree:{
                table:'modResourceTree', //Название таблицы
                class:'modResource', //Класс MODX таблицы базы данных. Если совпадает с table писать не обязательно.
                autocomplete_field:'pagetitle', //Если задано то при определении полей таблицы автоматически узнает поле autocomplect
                version:13, // при изменении в файле надо обновлять версию, чтобы изменения применились при установке.
                type: 3, //тип таблицы: 1 - таблица PVTables, 2 - таблица JSON, 3 - дерево UniTree
                authenticated:true, //доступ к таблице только аутентифицированным пользователям
                groups:'', //Можно определить группы пользователей которые будут иметь доступ к таблицам.
                permissions:'edit_document', //Можно определить разрешения MODX для которых будет разрешён доступ.
                active:true, // Включено. Можно быстро временно выключить таблицу.
                gtsAPIUniTreeClass:{ // Определения связанных таблиц. Нужны для синхронизации названий записей с таблицей UniTree.
                    modDocument: {
                        extended_modresource:1,
                        title_field: 'pagetitle', // поле названия в связанной таблице.
                        svg: //svg картинка таблицы в дереве
                        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-text" viewBox="0 0 16 16">
                            <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 1 0-1H5zM5 6a.5.5 0 0 0 0 1h6a.5.5 0 0 1 0-1H5zm0 2a.5.5 0 0 0 0 1h6a.5.5 0 0 1 0-1H5z"/>
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                        </svg>`
                    },
                },
                properties: { // свойства таблицы
                    autocomplete:{ // Для таблицы включается автокомплект, который можно затем использовать в полях type:'autocomplete'
                        tpl:'{$pagetitle}', // шаблон записей для автокомплект
                        where:{
                            "pagetitle:LIKE":"%query%", // Условие поиска в поле
                        },
                        limit:10, // число показываемых записей при поиске.
                    },
                    actions:{ // Действия определенные для таблицы. Для дерева это действия в раскрывающемся списке дерева.
                        create:{ //создать
                            tables:{ // определяет кнопку создать для разных таблиц gtsAPI
                                modDocument:{ // Для таблицы с именем table="modResource"
                                    label:'Создать ресурс',
                                    parent_classes:['root','modResource','modDocument'], //'root' можно создавать в корне дерева
                                    cls: 'p-button-rounded p-button-success',
                                    form:'UniTree', // пока нужно. Предустановленая форма для создания узла дерева.
                                    add_fields: { //добавочные поля в форму
                                        template: {
                                            label: 'Шаблон',
                                            type: 'autocomplete',
                                            table: 'modTemplate',
                                            default:1,
                                        },
                                        class_key: {
                                            label: 'Класс',
                                            type: 'text',
                                            default:'modDocument',
                                        },
                                    }
                                },
                            }
                        },
                        delete:{ // удалить узел дерева
                            // groups:'Administrator', // разрешено только администраторам.
                            permissions:'edit_document',
                        },
                        read:{},
                        update:{},
                    },
                    nodeclick:{ //Действия при клике на узел дерева
                        classes:{ // Определяет действие при клике для разных классов узла
                            default:{ //Для всех остальных классов по умолчанию
                                label: 'Ресурс',
                                tabs:{
                                    main:{
                                        type:'form',
                                        title:'Основное',
                                        table:'modResourceTree',
                                    },
                                    gallery:{
                                        type:'file-gallery',
                                        title:'Галерея Файлов',
                                        list_name:'main',
                                    }
                                }
                            },
                        }
                    },
                    useUniTree : true, //Включаем когда есть таблица - дерево и есть связанные таблицы. Если только таблица дерево, то выключаем
                    extendedModResource : true, //Включаем, если таблица дерево наследует modResource или связано с modResource
                    rootIds: 0, //С какого узла показывать дерево. Показываются дочерние только (Наверное, потом проверить).
                    idField:'id',
                    parentIdField: 'parent',
                    // parents_idsField: 'parents_ids', //не надо для modResource
                    menuindexField: 'menuindex',
                    isLeafEmptyChild: 1,
                    classField: 'class_key',
                    titleField: 'pagetitle',
                    fields: {
                        "id": {
                            "type": "view",
                            "label": "ID",
                            "class": "modResource"
                        },
                        "pagetitle": {
                            "label":"Заголовок",
                            "type": "text",
                            "class": "modResource"
                        },
                        "alias": {
                            "label":"Псевдоним",
                            "type": "text",
                            "class": "modResource"
                        },
                        "published": {
                            "label":"Опубликовано",
                            "type": "boolean",
                            "class": "modResource"
                        },
                        "content": {
                            "label":"Содержимое",
                            "type": "textarea",
                            "class": "modResource"
                        },
                        "parent": {
                            "label":"Родитель",
                            "type": "autocomplete",
                            "table": "modResourceTree",
                            "class": "modResource"
                        },
                        "menuindex": {
                            "label":"Порядок",
                            "type": "number",
                            "class": "modResource"
                        },
                        "class_key": {
                            "label":"Класс",
                            "type": "text",
                            "class": "modResource"
                        }
                    }
                }
            },
        }
    },
    modx:{
        name:'modx',
        gtsAPITables:{
            modTemplate:{
                table:'modTemplate',
                autocomplete_field:'template',
                version:6,
                type: 1,
                authenticated:true,
                groups:'',
                permissions:'edit_document',
                active:true,
                properties: {
                    autocomplete:{
                        tpl:'{$templatename}',
                        where:{
                            "templatename:LIKE":"%query%",
                        },
                        limit:0,
                    },
                }
            },
            modUserGroup:{
                table:'modUserGroup',
                autocomplete_field:'name',
                version:1,
                type: 1,
                authenticated:true,
                groups:'',
                permissions:'edit_user',
                active:true,
                properties: {
                    autocomplete:{
                        tpl:'{$name}',
                        where:{
                            "name:LIKE":"%query%",
                        },
                        limit:10,
                    },
                    actions:{
                        read:{},
                        create:{
                            permissions:'new_user',
                        },
                        update:{
                            permissions:'save_user',
                        },
                        delete:{
                            permissions:'delete_user',
                        },
                    },
                    fields: {
                        "id": {
                            "type": "view",
                            "label": "ID"
                        },
                        "name": {
                            "label":"Название группы",
                            "type": "text",
                            "required": true
                        },
                        "description": {
                            "label":"Описание",
                            "type": "textarea"
                        },
                        "parent": {
                            "label":"Родительская группа",
                            "type": "autocomplete",
                            "table": "modUserGroup"
                        },
                        "rank": {
                            "label":"Порядок",
                            "type": "number"
                        }
                    }
                }
            },
            modUserGroupMember:{
                table:'modUserGroupMember',
                version:2,
                type: 1,
                authenticated:true,
                groups:'',
                permissions:'edit_user',
                active:true,
                properties: {
                    query: {
                        class:'modUserGroupMember',
                        leftJoin: {
                            modUserGroup:{
                                class:'modUserGroup',
                                on:'modUserGroup.id = modUserGroupMember.user_group'
                            },
                            modUserGroupRole:{
                                class:'modUserGroupRole',
                                on:'modUserGroupRole.id = modUserGroupMember.role'
                            }
                        },
                        select: 'modUserGroupMember.*, modUserGroup.name as group_name, modUserGroupRole.name as role_name',
                    },
                    actions:{
                        read:{},
                        create:{
                            permissions:'new_user',
                        },
                        update:{
                            permissions:'save_user',
                        },
                        delete:{
                            permissions:'delete_user',
                        },
                    },
                    fields: {
                        "id": {
                            "type": "view",
                            "label": "ID"
                        },
                        "user_group": {
                            "label":"Группа пользователей",
                            "type": "autocomplete",
                            "table": "modUserGroup"
                        },
                        "member": {
                            "label":"Пользователь",
                            "type": "hidden"
                        },
                        "role": {
                            "label":"Роль",
                            "type": "autocomplete",
                            "table": "modUserGroupRole"
                        },
                        "rank": {
                            "label":"Порядок",
                            "type": "number"
                        }
                    }
                }
            },
            modUserGroupRole:{
                table:'modUserGroupRole',
                autocomplete_field:'name',
                version:1,
                type: 1,
                authenticated:true,
                groups:'',
                permissions:'edit_user',
                active:true,
                properties: {
                    autocomplete:{
                        tpl:'{$name}',
                        where:{
                            "name:LIKE":"%query%",
                        },
                        limit:10,
                    },
                    actions:{
                        read:{},
                    },
                    fields: {
                        "id": {
                            "type": "view",
                            "label": "ID"
                        },
                        "name": {
                            "label":"Название роли",
                            "type": "text"
                        },
                        "description": {
                            "label":"Описание",
                            "type": "textarea"
                        },
                        "authority": {
                            "label":"Уровень доступа",
                            "type": "number"
                        }
                    }
                }
            },
            modUser:{
                table:'modUser',
                autocomplete_field:'username',
                version:3,
                type: 1,
                authenticated:true,
                groups:'',
                permissions:'edit_user',
                active:true,
                properties: {
                    loadModels:'pvadmin',
                    query: {
                        class:'modUser',
                        leftJoin: {
                            modUserProfile:{
                                class:'modUserProfile',
                                on:'modUserProfile.internalKey = modUser.id'
                            }
                        },
                        select: 'modUser.id, modUser.username, modUserProfile.fullname, modUserProfile.email',
                    },
                    autocomplete:{
                        tpl:'{$username} ({$fullname})',
                        where:{
                            "modUser.username:LIKE":"%query%",
                        },
                        limit:10,
                    },
                    actions:{
                        read:{},
                        create:{
                            permissions:'new_user',
                        },
                        update:{
                            permissions:'save_user',
                        },
                        subtabs:{
                            userGroups:{
                                modUserGroupMember:{
                                    title:"Группы пользователей",
                                    table:"modUserGroupMember",
                                    where: {
                                        "member":"id"
                                    }
                                },
                            }
                        },
                        delete:{
                            permissions:'delete_user',
                        },
                    },
                    class_link:{
                        modUserProfile:{
                            internalKey:'id'
                        }
                    },
                    fields: {
                        "id": {
                            "type": "view",
                            "label": "ID"
                        },
                        "username": {
                            "label":"Имя пользователя",
                            "type": "text",
                            "required": true
                        },
                        "fullname": {
                            class:'modUserProfile',
                            "label":"Полное имя",
                            "type": "text"
                        },
                        "email": {
                            class:'modUserProfile',
                            "label":"Email",
                            "type": "email"
                        },
                        "password": {
                            "label":"Пароль",
                            "type": "password",
                            "modal_only": true
                        }
                    }
                }
            },
        }
    },
    
    // gtsshop:{
    //     name:'gtsshop',
    //     gtsAPITables:{
    //         gsProductParam:{
    //             table:'gsProductParam',
    //             autocomplete_field:'',
    //             version:1,
    //             type: 1,
    //             authenticated:true,
    //             groups:'',
    //             permitions:'',
    //             active:true,
    //             properties: {
    //                 actions:{
    //                     read:{},
    //                     create:{},
    //                     update:{},
    //                 },
    //             }
    //         }
    //     }
    // },
    // modx:{
    //     name:'modx',
    //     gtsAPITables:{
    //         modTemplate:{
    //             table:'modTemplate',
    //             autocomplete_field:'template',
    //             version:4,
    //             type: 1,
    //             authenticated:true,
    //             groups:'',
    //             permitions:'',
    //             active:true,
    //             properties: {
    //                 autocomplete:{
    //                     tpl:'{$templatename}',
    //                     where:{
    //                         "templatename:LIKE":"%query%",
    //                     },
    //                     limit:0,
    //                 },
    //             }
    //         },
    //         modResource:{
    //             table:'modResource',
    //             autocomplete_field:'',
    //             version:2,
    //             authenticated:true,
    //             groups:'',
    //             permitions:'',
    //             active:true,
    //             properties: {
    //                 actions:{
    //                     read:{},
    //                     update:{}
    //                 },
    //                 "fields": {
    //                     "id": {
    //                         "type": "view",
    //                         "class": "modResource"
    //                     },
    //                     "pagetitle": {
    //                         "label":"Заголовок",
    //                         "type": "text",
    //                         "class": "modResource"
    //                     },
    //                     "alias": {
    //                         "label":"Псевдоним",
    //                         "type": "text",
    //                         "class": "modResource"
    //                     },
    //                     "published": {
    //                         "label":"Опубликовано",
    //                         "type": "boolean",
    //                         "class": "modResource"
    //                     },
    //                     "content": {
    //                         "label":"Содержимое",
    //                         "type": "textarea",
    //                         "class": "modResource"
    //                     }
    //                 },  
    //             }
    //         },
    //     }
    // }
}
