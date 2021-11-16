var quarryOwners = [];
var users = [];

/***
 * Load all users
 */
function loadUsers() {

    const SERVER_URL = getServerUrl();

    $.ajax({
        url: SERVER_URL + '/admin/web/manage-access/user/list',
        type: 'post',
        complete: function (response) {
            if (response.status == 200) {
                users = response.responseJSON;
                var tableBody = prepareUserTableBody(users);
                $('#idUserTableBody').html(tableBody);
            } else {
                showErrorAlert('Unable to load user details.Please try again later.', 'errorDiv');
            }
        }
    });

}

loadUsers();

function prepareUserTableBody(users) {
    var tableBody = '';
    users.forEach(user => {
        tableBody += '<tr class="form-label">';
        tableBody += '<td>';
        tableBody += user.id;
        tableBody += '</td>';
        tableBody += '<td>';
        tableBody += user.mobile;
        tableBody += '</td>';
        tableBody += '<td>';
        tableBody += user.email;
        tableBody += '</td>';
        tableBody += '<td>';
        tableBody += user.owner;
        tableBody += '</td>';
        tableBody += '<td>';
        tableBody += user.roles;
        tableBody += '</td>';
        tableBody += '<td>';
        if (user.status == 'Y') {
            tableBody += 'Active';
        } else {
            tableBody += 'InActive';
        }
        tableBody += '</td>';

        tableBody += '<td>';
        tableBody += '<button type="button" class="btn btn-primary" title="Update" alt="Update" onClick="fn_update(\'' + user.id + '\')"><i class="fa fa-edit"></i></button>';
        tableBody += '&nbsp;&nbsp;';
        tableBody += '<button type="button" class="btn btn-danger" title="Remove" alt="Remove" onClick="fn_remove(\'' + user.id + '\')"><i class="fa fa-trash"></i></button>';
        tableBody += '</td>';

        tableBody += '</tr>';
    });

    if (users.length == 0) {
        tableBody += '<tr class="form-label">';
        tableBody += '<td colspan="7" align="center">';
        tableBody += 'No records avaialble.';
        tableBody += '</td>';
        tableBody += '</tr>';

    }

    return tableBody;
}

$('#btnUFSubmit').click(function (event) {

});

loadQuarryOwners();

/***
 * Get all Quarry Owner Names
 */
function loadQuarryOwners() {

    const SERVER_URL = getServerUrl();

    $.ajax({
        url: SERVER_URL + '/quarry/common/allOwners',
        type: 'post',
        complete: function (response) {
            if (response.status == 200) {
                quarryOwners = response.responseJSON;
            } else {
                //showErrorAlert('Unable to load quarry owners.Please try again later.','errorDiv');
            }
        }
    });
}


function fn_update(userId) {
    var user = users.filter(function (user) {
        return user.id == userId;
    })[0];
    
    $('#txtMobile').val(user.mobile);
    $('#txtEmail').val(user.email);
    $('#txtPassword').val(user.password);
    $('#txtPassword').attr('readonly','readonly');
    $('#txtOwner').val(user.owner);

    $('#showModalDialog').modal('show');
}

function fn_remove(userId) {

}