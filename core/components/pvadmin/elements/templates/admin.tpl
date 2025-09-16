<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$_modx->resource.pagetitle} | PVAdmin</title>
    <base href="{'site_url' | config}" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    
    <style>
        .navbar-brand {
            font-weight: bold;
        }
        .admin-content {
            min-height: calc(100vh - 76px);
        }
        .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .login-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            width: 100%;
            max-width: 400px;
        }
        .vue-app {
            width: 100%;
            height: calc(100vh - 76px);
        }
    </style>
</head>
<body>
    {if $_modx->user.id}
        <!-- Навигационная панель для авторизованных пользователей -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="{'pvadmin_p_admin' | option | url}">
                    <i class="bi bi-shield-check"></i> PVAdmin
                </a>
                
                <!-- Меню ресурсов -->
                <div class="navbar-nav me-auto">
                    {$_modx->runSnippet('!pdoMenu', [
                        'parents' => 'pvadmin_p_admin' | option,
                        'level' => 3,
                        'checkPermissions' => 'list',
                        'outerTpl' => '@INLINE:{$wrapper}',
                        'rowTpl' => '@INLINE:{$level == 1 ? 
                            ($children ? 
                                "<div class=\"nav-item dropdown\">
                                    <a class=\"nav-link dropdown-toggle\" href=\"{$link}\" role=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">
                                        <i class=\"bi bi-arrow-right-circle\"></i> {$menutitle}
                                    </a>
                                    <ul class=\"dropdown-menu\">{$wrapper}</ul>
                                </div>" : 
                                "<a class=\"nav-link\" href=\"{$link}\">
                                    <i class=\"bi bi-arrow-right-circle\"></i> {$menutitle}
                                </a>"
                            ) : 
                            "<li><a class=\"dropdown-item\" href=\"{$link}\">
                                <i class=\"bi bi-arrow-right-circle\"></i> {$menutitle}
                            </a></li>"
                        }'
                    ])}
                </div>
                
                <!-- Пользовательское меню -->
                <div class="navbar-nav">
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-circle"></i> {$_modx->user.username}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item" href="{$_modx->resource.id | url}?service=logout">
                                    <i class="bi bi-box-arrow-right"></i> Выход
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        
        <!-- Основной контент для авторизованных пользователей -->
        <div class="admin-content">
            {if $_modx->resource.alias == 'admin'}
                <p>Вы успешно вошли в систему. Редактирование ресурсов доступно только администраторам во вкладке "Ресурсы".</p>
            {else}
                <!-- Контент других страниц админки -->
                <div class="container-fluid py-4">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="mb-4">{$_modx->resource.pagetitle}</h1>
                            {$_modx->resource.content}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <!-- Logout snippet для обработки выхода -->
    {$_modx->runSnippet('!Login', [
        'tplType'=>'inline',
        'loginTpl' => '',
        'loginResourceId' => $_modx->resource.id,
        'logoutResourceId' => 'unauthorized_page' | option
    ])}
    {else}
        <!-- Форма авторизации для неавторизованных пользователей -->
        <div class="login-container">
            <div class="login-card">
                <div class="text-center mb-4">
                    <i class="bi bi-shield-check text-primary" style="font-size: 3rem;"></i>
                    <h2 class="mt-3">PVAdmin</h2>
                    <p class="text-muted">Вход в систему администрирования</p>
                </div>
                
                {$_modx->runSnippet('!Login', [
                    'tplType'=>'inline',
                    'loginTpl' => '
                        <div class="loginMessage">[[+errors]]</div>
                        <form class="login" action="[[+actionUrl]]" method="post">
                            <input type="hidden" name="service" value="login" />
                            <input type="hidden" name="returnUrl" value="[[+returnUrl]]" />
                            
                            <div class="mb-3">
                                <label for="username" class="form-label">
                                    <i class="bi bi-person"></i> Имя пользователя
                                </label>
                                <input type="text" name="username" id="username" class="form-control" value="[[+username]]" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="password" class="form-label">
                                    <i class="bi bi-lock"></i> Пароль
                                </label>
                                <input type="password" name="password" id="password" class="form-control" required>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input type="checkbox" name="rememberme" id="rememberme" class="form-check-input" value="1" [[+rememberme]]>
                                <label class="form-check-label" for="rememberme">
                                    Запомнить меня
                                </label>
                            </div>
                            
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary btn-lg">
                                    <i class="bi bi-box-arrow-in-right"></i> Войти
                                </button>
                            </div>
                        </form>',
                    'loginResourceId' => $_modx->resource.id,
                    'logoutResourceId' => 'unauthorized_page' | option
                ])}
            </div>
        </div>
    {/if}
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    
</body>
</html>
