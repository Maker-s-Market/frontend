import {useAuthContext} from "../../contexts/auth.jsx";
import * as Yup from "yup";
import {Hero} from "../../components/home/hero/index.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useMutation} from "react-query";
import {editProfile} from "../../api/fetchAuth.js";
import {useNotification} from "../../hooks/useNotification.js";
import {useNavigate} from "react-router-dom";
import {FormError} from "../../components/common/formError/index.js";
import {useState} from "react";

export const EditProfile = (props) => {
    const [photo, setPhoto] = useState("");
    const {user, token, setUser} = useAuthContext();
    const notification = useNotification()
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        username: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        region: Yup.string().required("Required"),
        photo: Yup.mixed(),
    })

    const editProfileMutation = useMutation({
        mutationFn: ({
                         name,
                         username,
                         email,
                         city,
                         region
                     }) => editProfile(token, user.id, name, username, email, city, region, photo),
        onSuccess: (data) => {
            setUser(() => data)
            //Update user photo field in the useState
            notification.info("Profile Updated")
            navigate("/profile/" + user.id)
        }
    })

    const handleSubmit = (values) => editProfileMutation.mutate(values)

    return <div>
        
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
                            <ErrorMessage component={FormError} name={"name"}/>
                        </div>
                        <Field type="text" name="name" placeholder="Name" className="input input-bordered"/>

                        <div>
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <ErrorMessage component={FormError} name={"username"}/>
                        </div>
                        <Field type="text" name="username" placeholder="Username" className="input input-bordered"/>

                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <ErrorMessage component={FormError} name={"email"}/>
                        </div>
                        <Field type="text" name="email" placeholder="Email" className="input input-bordered"/>

                        <div>
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <ErrorMessage component={FormError} name={"city"}/>
                        </div>
                        <Field type="text" name="city" placeholder="City" className="input input-bordered"/>

                        <div>
                            <label className="label">
                                <span className="label-text">Region</span>
                            </label>
                            <ErrorMessage component={FormError} name={"region"}/>
                        </div>
                        <Field type="text" name="region" placeholder="Region" className="input input-bordered"/>

                        <div>
                            <label className="label">
                                <span className="label-text">Profile Photo</span>
                            </label>
                            <ErrorMessage component={FormError} name={"photo"}/>
                        </div>
                        <input id="photo" name="photo" type="file"
                               className={"file-input file-input-bordered file-input-accent w-full"}
                               onChange={(event) => {
                                   setPhoto(event.currentTarget.files[0]);
                               }}/>

                        <button type="submit" className="btn btn-accent btn-block mt-2">Submit</button>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>
        ;
};