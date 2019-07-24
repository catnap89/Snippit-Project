/*

    This file handles the main aspects of the application

*/

// on click #main-add-btn, display modal

$('#main-add-btn').on('shown.bs.modal', function () {
  $('#main-modal-div').trigger('focus')
})

/*
<!-- Button trigger modal-->
<button type="button" class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#main-modal-div" id="main-add-btn">Create Snippit</button>
//
<div class="modal" tabindex="-1" role="dialog" id="main-modal-div">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Snippit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                    id="model-cancel-btn">Cancel</button>
                <button type="button" class="btn btn-primary" id="modal-save-btn">Save</button>
            </div>
        </div>
    </div>
</div>



*/