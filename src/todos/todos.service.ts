import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

  findProject(id: string) {
    return this.prismaService.projects.findUnique({
      where: {
        id,
      },
    });
  }

  findAllProjects(userId) {
    return this.prismaService.projects.findMany({
      where: {
        userId,
      },
      include: {
        todos: {
          select: {
            project: true,
          },
        },
      },
    });
  }

  createProject(userId: string, name: string) {
    return this.prismaService.projects.create({
      data: {
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  updateProject(projectId, newName) {
    return this.prismaService.projects.update({
      where: {
        id: projectId,
      },
      data: {
        name: newName,
      },
    });
  }

  createToDo(projectId, title: string) {
    return this.prismaService.todo.create({
      data: {
        title,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  }
}
