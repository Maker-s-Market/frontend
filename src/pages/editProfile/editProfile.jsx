import {useAuthContext} from "../../contexts/auth.jsx";
import * as Yup from "yup";
import {Hero} from "../../components/home/hero/index.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useMutation} from "react-query";
import {editProfile} from "../../api/fetchAuth.js";
import {useNotification} from "../../hooks/useNotification.js";
import {useNavigate} from "react-router-dom";
import {FormError} from "../../components/common/formError/index.js";

export const EditProfile = (props) => {

    const {user,token,setUser} = useAuthContext();
    const notification = useNotification()
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        username: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        region: Yup.string().required("Required")
    })

    const editProfileMutation = useMutation({
        mutationFn: ({name, username, email, city, region}) => editProfile(token, user.id,name, username, email, city, region,user.photo),
        onSuccess: (data) => {
            setUser(()=>data)
            notification.info("Profile Updated")
            navigate("/profile/"+user.id)
        }
    })

    const handleSubmit = (values) => editProfileMutation.mutate(values)

    return <div>
        <Hero/>
        <div className="flex flex-col m-8 space-y-4">
            <img src={user.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                 alt="profile picture"
                 className={"rounded-full w-48 h-48 mx-auto"}
            />
            <text className={"text-5xl font-bold"}>Edit Profile</text>

            <Formik initialValues={{
                name: user.name,
                username: user.username,
                email: user.email,
                city: user.city,
                region: user.region,
                photo: user.photo
            }} onSubmit={(values) => handleSubmit(values)}
                    validationSchema={validationSchema}
            >
                <Form>
                    <div className="form-control w-full">
                        <div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <ErrorMessage component={FormError}  name={"name"} />
                        </div>
                        <Field type="text" name="name" placeholder="Name" className="input input-bordered"/>
                    </div>

                    <div className="form-control w-full">
                        <div>
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <ErrorMessage component={FormError}  name={"username"} />
                        </div>
                        <Field type="text" name="username" placeholder="Username" className="input input-bordered"/>
                    </div>

                    <div className="form-control w-full">
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <ErrorMessage component={FormError}  name={"email"} />
                        </div>
                        <Field type="text" name="email" placeholder="Email" className="input input-bordered"/>
                    </div>

                    <div className="form-control w-full">
                        <div>
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <ErrorMessage component={FormError}  name={"city"} />
                        </div>
                        <Field type="text" name="city" placeholder="City" className="input input-bordered"/>
                    </div>

                    <div className="form-control w-full">
                        <div>
                            <label className="label">
                                <span className="label-text">Region</span>
                            </label>
                            <ErrorMessage component={FormError}  name={"region"} />
                        </div>
                        <Field type="text" name="region" placeholder="Region" className="input input-bordered"/>
                    </div>

                    <button type="submit" className="btn btn-accent btn-block mt-2">Submit</button>
                </Form>
            </Formik>
        </div>
    </div>;
};