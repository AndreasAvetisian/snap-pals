import { useUserContext } from '@/context/AuthContext';
import { canBeMovified, formatDate } from '@/lib/utils';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';

type PostCardProps = {
    post: Models.Document
}

const PostCard = ({ post }: PostCardProps) => {
    const { user } = useUserContext();

    if(!post.creator) return;

    // write code here

    const canBeMovifiedValue = canBeMovified(post.$createdAt, 15)
    
    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img
                            src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                            alt="creator"
                            className="rounded-full w-12 lg:h-12"
                        />
                    </Link>

                    <div className="flex flex-col">
                        <div className="flex gap-2 items-center">
                            <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                            <a
                                href={`/profile/${post.creator.$id}`}
                                className="
                                    subtle-semibold 
                                    lg:small-regular 
                                    text-light-3
                                "
                            >
                                @{post.creator.username}
                            </a>
                        </div>
                        <div className="flex-start gap-2 text-light-3">
                            <p className="subtle-semibold lg:small-regular">{formatDate(post.$createdAt)}</p>
                            -
                            <p className="subtle-semibold lg:small-regular">{post.location}</p>
                        </div>
                    </div>
                </div>

                <Link 
                    to={`/update-post/${post.$id}`}
                    className={`${user.id !== post.creator.$id || !canBeMovifiedValue ? "hidden" : ""}`}
                >
                    <img
                        src="/assets/icons/edit.svg"
                        alt="edit post"
                        width={20}
                        height={20}
                    />
                </Link>
            </div>

            <Link to ={`/post/${post.$id}`}>
                <div className="small-medium lg:base-medium py-5">
                    <p>{post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                        {post.tags.map((tag: string) => (
                            <li key={tag} className="text-light-3">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <img
                    src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt="image"
                    className="post-card_img"
                />
            </Link>

            <PostStats post={post} userId={user.id} />
        </div>
    )
}

export default PostCard