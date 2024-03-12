import { User } from "src/core/domain/user/user";

export class UserRepository{
    private repository: User[] = []
    save (user:User): void {
        this.repository.push(user)
    }

    findById(id: string): User {
        return this.repository.find((user) => user.id === id)
    }

    findByUsername(username: string): User {
        return this.repository.find((user) => user.username === username)
    }

    isuserSaved(user: User): boolean {
        return this.repository.some((u) => u.id === user.id)
    }
}