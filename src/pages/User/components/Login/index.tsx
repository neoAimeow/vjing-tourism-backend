import React from "react";

interface Props {}

// class TestPage extends Component<Props> {
//     state = {};

//     render() {
//         return <div> hello test page</div>;
//     }
// }

const Login = (props: Props) => {
    console.warn("loginPage");

    return <div> hello Login page2</div>;
};

export default Login;