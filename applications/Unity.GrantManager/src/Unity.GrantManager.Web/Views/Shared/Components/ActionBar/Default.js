$(function () {
    let selectedApplicationIds = [];
    let assignApplicationModal = new abp.ModalManager({
        viewUrl: 'AssigneeSelection/AssigneeSelectionModal'
    });
    let unAssignApplicationModal = new abp.ModalManager({
        viewUrl: 'AssigneeSelection/AssigneeSelectionModal'
    });    
    let statusUpdateModal = new abp.ModalManager({
        viewUrl: 'StatusUpdate/StatusUpdateModal'
    });
    let approveApplicationsModal = new abp.ModalManager({
        viewUrl: 'Approve/ApproveApplicationsModal'
    });
    let dontApproveApplicationsModal = new abp.ModalManager({
        viewUrl: 'Approve/ApproveApplicationsModal'
    });

    assignApplicationModal.onResult(function () {
        abp.notify.success(
            'The application assignees has been successfully updated.',
            'Application Assinee'
        );
        PubSub.publish("refresh_application_list");
    });

    unAssignApplicationModal.onResult(function () {
        abp.notify.success(
            'The application assignee has been successfully removed.',
            'Application Assinee'
        );
        PubSub.publish("refresh_application_list");
    });

    statusUpdateModal.onResult(function () {
        abp.notify.success(
            'The application status has been successfully updated',
            'Application Status'
        );
        PubSub.publish("refresh_application_list");
    });
    approveApplicationsModal.onResult(function () {
        abp.notify.success(
            'The application/s has been successfully approved',
            'Approve Applications'
        );
        PubSub.publish("refresh_application_list");
    });
    dontApproveApplicationsModal.onResult(function () {
        abp.notify.success(
            'The application/s has now been disapproved',
            'Not Approve Applications'
        );
        PubSub.publish("refresh_application_list");
    });
    approveApplicationsModal.onClose(function () {
        PubSub.publish("refresh_application_list");
    });
    dontApproveApplicationsModal.onClose(function () {
        PubSub.publish("refresh_application_list");
    });
    
    PubSub.subscribe("select_application", (msg, data) => {
        selectedApplicationIds.push(data.id);
        manageActionButtons();

    });
    PubSub.subscribe("deselect_application", (msg, data) => {
        selectedApplicationIds.pop(data.id);
        manageActionButtons();

    });

    PubSub.subscribe("clear_selected_application", (msg, data) => {
        selectedApplicationIds = [];
        manageActionButtons();
    });

    $('#assignApplication').click(function () {
        assignApplicationModal.open({
            applicationIds: JSON.stringify(selectedApplicationIds),
            actionType: 'Add'
        });
    });

    $('#unAssignApplication').click(function () {
        unAssignApplicationModal.open({
            applicationIds: JSON.stringify(selectedApplicationIds),
            actionType: 'Remove'
        });
    });

    $('#statusUpdate').click(function () {
        statusUpdateModal.open({
            applicationIds: JSON.stringify(selectedApplicationIds),
        });
    });
    $('#approveApplications').click(function () {
        approveApplicationsModal.open({
            applicationIds: JSON.stringify(selectedApplicationIds),
            operation: 'GRANT_APPROVED',
            message: 'Are you sure you want to approve the selected application/s?',
            title: 'Approve Applications',
        });
    });
    $('#dontApproveApplications').click(function () {
        dontApproveApplicationsModal.open({
            applicationIds: JSON.stringify(selectedApplicationIds),
            operation: 'GRANT_NOT_APPROVED',
            message: 'Are you sure you want to disapprove the selected application/s?', 
            title: 'Not Approve Applications',
        });
    });

    

    $('#externalLink').click(function () {
        location.href =
            '/GrantApplications/Details?ApplicationId=' +
            selectedApplicationIds[0];
    });

    function manageActionButtons() {
        if (selectedApplicationIds.length == 1) {
            $('#externalLink').prop('disabled', false);
        }
        else {
            $('#externalLink').prop('disabled', true);

        }
        if (selectedApplicationIds.length == 0) {
            $('*[data-selector="applications-table-actions"]').prop('disabled', true);
            $('.action-bar').removeClass('active');
        }
        else {
            $('*[data-selector="applications-table-actions"]').prop('disabled', false);
            $('.action-bar').addClass('active');
        }
    }
});