import React from 'react';
import { MessageSquare, Eye, ThumbsUp, Clock } from 'lucide-react';
import type { Post } from '@/types/community';
import { formatDate } from '@/utils/dateUtils';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const categoryColors = {
    Discussion: 'bg-purple-100 text-purple-800',
    Question: 'bg-blue-100 text-blue-800',
    Resource: 'bg-green-100 text-green-800',
    Event: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">{post.author.name}</h3>
            <span className="text-sm text-gray-500">{post.author.role}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
          {post.category}
        </span>
      </div>

      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {post.replies}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {post.views}
          </span>
        </div>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {formatDate(post.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default PostCard;