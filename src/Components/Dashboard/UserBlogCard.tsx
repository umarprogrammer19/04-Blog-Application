import { Edit, Trash2 } from 'lucide-react'
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface BlogCardProps {
    userName: string
    userAvatar: string
    blogTitle: string
    blogDescription: string
    postedAt: Date
    onEdit: () => void
    onDelete: () => void
}

export function BlogCard({
    userName,
    userAvatar,
    blogTitle,
    blogDescription,
    postedAt,
    onEdit,
    onDelete
}: BlogCardProps) {
    return (
        <Card className="w-full border border-gray-300 rounded-lg shadow-sm">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 border border-violet-600">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback className="bg-violet-600 text-white">
                            {userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-semibold text-violet-700">{userName}</h2>
                        <p className="text-sm text-gray-500">
                            Posted on {postedAt.toLocaleDateString()} at {postedAt.toLocaleTimeString()}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onEdit}
                        className="border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white transition duration-300"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onDelete}
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-300"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <h3 className="text-2xl font-bold">{blogTitle}</h3>
                <p className="text-gray-600">{blogDescription}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
                <p className="text-sm text-gray-500">
                    Last updated: {postedAt.toLocaleString()}
                </p>
            </CardFooter>
        </Card>

    )
}

