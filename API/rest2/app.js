function DeleteRow(id) {
    let url_delete = 'http://localhost:3000/user/' + id;
    fetch(url_delete, {
        method: "DELETE"
    }).then(function(res) {
        return res.json(); // chuyển chuỗi nhận được thành đối tượng json
    }).then(function(data) {
        // các lệnh xử lý cho dữ liệu ở đây: các công việc hiển thị.
        // console.log(data);
        // location.reload();
        LoadListUser();
    });
}

function EditRow(id) {
    console.log("Edit row " + id);
    // hàm này có chức năng lấy thông tin bản ghi và hiện lên form.
    // vì nhiều khi danh sách không hiển thị hết thông tin của bản ghi nên phải load lại từ server.

    let url_delete = 'http://localhost:3000/user/' + id;

    fetch(url_delete, {
        method: "GET" // dùng phương thức get để lấy thông tin
    }).then(function(res) {
        return res.json(); // chuyển chuỗi nhận được thành đối tượng json
    }).then(function(data) {
        // các lệnh xử lý cho dữ liệu ở đây: các công việc hiển thị.
        console.log(data);
        // tham số data lúc này sẽ là một đối tượng, ta sẽ sử dụng theo cách dùng của đối tượng: Tên.THuộc tính

        // thực hiện gắn dữ liệu lên form
        //         <input type="text" name="username" placeholder="Nhập username" /> <br>
        // <input type="text" name="fullname" placeholder="Nhập họ tên" /> <br>
        // <input type="text" name="email" placeholder="Nhập email" />

        document.querySelector("input[name=username]").value = data.username;
        document.querySelector("input[name=fullname]").value = data.fullname;
        document.querySelector("input[name=email]").value = data.email;

        //ngoài ra bạn cần giữ lại id để làm căn cứ gửi dữ liệu lên, có thể là thêm 1 thẻ hidden hoặc gắn luôn vào 1 thuộc tính của thẻ form
        document.querySelector("#form_edit").setAttribute('id_edit', id); // tôi gắn luôn vào thẻ form cho nhanh

        document.querySelector("#form_edit").style.display = "block";
        // ok giờ đợi người dùng sửa và bấm nút cập nhật.

    });

}

// chức năng thêm mới user
// địa chỉ thêm mới user sẽ là: http://localhost:3000/user
// phương thức sẽ là post

// các bước thực hiện: 1. Lấy dữ liệu cho vào biến, 2. Kiểm tra hợp lệ, 3. Gọi sự kiện post.

function SaveNew() {
    //1. Lấy dữ liệu
    var u = document.querySelector("input[name=username]").value;
    var n = document.querySelector("input[name=fullname]").value;
    var e = document.querySelector("input[name=email]").value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([gmail])+\.)+([com])+$/;
    var atposition = e.indexOf("@");
    var dotposition = e.lastIndexOf(".");


    //2. kiểm tra hợp lệ
    if (u.length == 0) {
        alert('Bạn cần nhập username');
        return false;
    } else if(u.length < 6){
        alert('Bạn không được nhập nhỏ hơn 6 kí tự');
        return false;
    }
    
    //  làm tiếp các kiểm tra khác ở đây

 /*if (!filter.test(e.value)) { 
        alert('Hay nhap dia chi email hop le.\nExample@gmail.com'); 
        return false; 
    } else{

    }*/
        if (atposition < 1 || dotposition < (atposition + 2)
                || (dotposition + 2) >= e.length) {
            alert("Please enter a valid e-mail address.");
            return false;
                }
    
    ///......

    //3. Gửi dữ liệu lên server
    // trước hết là tạo đối tượng để cài dữ liệu vào
    var dataPost = {
        username: u,
        fullname: n,
        email: e
    };
    var url_post = 'http://localhost:3000/user';

    fetch(url_post, {
            method: 'POST', // thêm mới thì dùng post
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPost), // chuyển dữ liệu object trên thành chuỗi json
        })
        .then((response) => response.json()) // chuyển kết quả trả về thành json object
        .then((data) => {

            // bạn có thể làm gì đó với kết quả cuối cùng này thì làm

            console.log('Success:', data); // ghi log kết quả hoàn thành
        })
        .catch((error) => {

            console.error('Error:', error); // ghi log nếu xảy ra lỗi
        });
}

// hàm này chạy khi bấm nút Save Update
function SaveUpdate() {
    //1. Lấy dữ liệu 
    var u = document.querySelector("input[name=username]").value;
    var n = document.querySelector("input[name=fullname]").value;
    var e = document.querySelector("input[name=email]").value;

    //2. kiểm tra hợp lệ
    if (u.length == 0) {
        alert('Bạn cần nhập username');
        return false;
    }
    // bạn làm tiếp các kiểm tra khác ở đây

    ///......

    //3. Gửi dữ liệu lên server
    // trước hết là tạo đối tượng để cài dữ liệu vào
    // 
    var dataPost = {
        username: u,
        fullname: n,
        email: e
    };


    // lấy id bản ghi cần sửa để cho vào url: 
    var id_edit = document.querySelector("#form_edit").getAttribute('id_edit');

    var url_post = 'http://localhost:3000/user/' + id_edit; // nối vào url để cho hợp lệ.

    fetch(url_post, {
            method: 'PATCH', // sửa thì dùng phương thức PATCH
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPost), // chuyển dữ liệu object trên thành chuỗi json
        })
        .then((response) => response.json()) // chuyển kết quả trả về thành json object
        .then((data) => {

            // bạn có thể làm gì đó với kết quả cuối cùng này thì làm

            console.log('Success:', data); // ghi log kết quả hoàn thành

            if (data.id == id_edit) {
                alert('Đã cập nhật thành công');
                LoadListUser();

                // xóa rỗng các ô textbox ở form
                document.querySelector("input[name=username]").value = '';
                document.querySelector("input[name=fullname]").value = '';
                document.querySelector("input[name=email]").value = '';
                document.querySelector("#form_edit").removeAttribute('id_edit'); // xóa cả cái id vừa gắn vào
            }


        })
        .catch((error) => {

            console.error('Error:', error); // ghi log nếu xảy ra lỗi
        });
}

function LoadListUser() {
    
    var url = "http://localhost:3000/user";

    fetch(url, {
        method: "GET"
    }).then(function(res) {
        return res.json(); // chuyển chuỗi nhận được thành đối tượng json
    }).then(function(data) {
        // các lệnh xử lý cho dữ liệu ở đây: các công việc hiển thị.
        console.log(data);

        //duyệt mảng và tạo các element cho vào bảng

        var bang = document.querySelector('#ds-u');
        bang.innerHTML = ''; // xóa rỗng bảng mỗi khi load

        for (i = 0; i < data.length; i++) {
            var obj = data[i];
            // Tạo thêm 1 dòng ở cuối bảng bằng cú pháp sau
            let dong_moi = bang.insertRow(-1);

            // Thêm ô thứ nhất, chỉ số thứ tự là 0, ô này dùng để hiển thị ID
            let o1 = dong_moi.insertCell(0);
            o1.innerText = obj.id;

            // Thêm ô thứ hai, chỉ số thứ tự là 1, ô này dùng để hiển thị username
            let o2 = dong_moi.insertCell(1);
            o2.innerText = obj.username;

            // Thêm ô thứ ba, chỉ số thứ tự là 2, ô này dùng để hiển thị fullname
            let o3 = dong_moi.insertCell(2);
            o3.innerText = obj.fullname;

            // Thêm ô thứ bốn, chỉ số thứ tự là 3, ô này dùng để hiển thị email
            let o4 = dong_moi.insertCell(3);
            o4.innerText = obj.email;

            // Thêm ô thứ năm, chỉ số thứ tự là 4, ô này dùng để hiển thị nút bấm sửa và xóa
            let o5 = dong_moi.insertCell(4);
            // tạo nút bấm xóa:
            var btn_xoa = document.createElement('button');
            btn_xoa.setAttribute('type', 'button');
            btn_xoa.innerText = "Xóa";
            btn_xoa.setAttribute('onclick', 'DeleteRow(' + obj.id + ')') // truyền vào id user
            o5.appendChild(btn_xoa);

            // tạo thêm nút sửa
            var btn_sua = document.createElement('button');
            btn_sua.setAttribute('type', 'button');
            btn_sua.innerText = "Sửa";
            btn_sua.setAttribute('onclick', 'EditRow(' + obj.id + ')') // truyền vào id user
            o5.appendChild(btn_sua);
        }

    });
}