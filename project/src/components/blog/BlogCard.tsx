import React from 'react';
import { Clock, Eye, ThumbsUp } from 'lucide-react';
import { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils/dateUtils';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

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

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h4 className="text-sm font-medium text-gray-900">{post.author.name}</h4>
              <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {post.likes}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
export default BlogCard;