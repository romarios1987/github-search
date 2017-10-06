$(document).ready(function () {
    $('#searchUser').on('keypress', function (e) {
        var username = e.target.value;

        // Make request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'ad8c37b74fff44db3401',
                client_secret: '02c215a999f915b16e3ef2e9d24ab88d7206646a'
            }
        }).done(function (user) {

            // Ajax request for repos
            $.ajax.get({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'ad8c37b74fff44db3401',
                    client_secret: '02c215a999f915b16e3ef2e9d24ab88d7206646a'
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
                    <div class="well">
                        <div class="row">
                            <div class="col-md-7">
                                <strong>${repo.name}</strong>:${repo.description}
                            </div>
                            <div class="col-md-3">
                                <span class="label label-default">Forks: ${repo.forks_count}</span>
                                 <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                 <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                            </div>
                            <div class="col-md-2">
                                <a  class="btn btn-default" href="${repo.html_url}" target="_blank">Repo Page</a>
                            </div>
                        </div>
                     </div>`);
                });
            });

            $('#profile').html(`<div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">${user.name}</h3>
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <img class="thumbnail avatar" src="${user.avatar_url}" alt="${user.name}">
                                                <a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">View Profile</a>
                                            </div>
                                            <div class="col-md-9">
                                                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                                                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                                                <span class="label label-success">Followers: ${user.followers}</span>
                                                <span class="label label-info">Following: ${user.following}</span>
                                                <br><br>
                                                <ul class="list-group">
                                                    <li class="list-group-item">Company: ${user.company}</li>
                                                    <li class="list-group-item">Blog: <a href="${user.blog}">${user.blog}</a></li>
                                                    <li class="list-group-item">Location: ${user.location}</li>
                                                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                               <h3 class="page-header">Latest Repos</h3>
                               <div class="" id="repos"></div>
                `);
        })
    });
});
