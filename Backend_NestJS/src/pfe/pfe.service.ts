import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UpdatePfeDto } from './pfe.dto';
import { Pfe } from './pfe.entity';

@Injectable()
export class PfeService {
    constructor(
        @InjectRepository(Pfe) private pfeRepository: Repository<Pfe>,
    ) { }

    async addPfe(pfe: Pfe): Promise<Pfe> {
        return await this.pfeRepository.save(pfe);
    }
    async findAllPfe(): Promise<Pfe[]> {
        return await this.pfeRepository.find();
    }

    async findPfeById(id: string): Promise<Pfe> {
        const Pfe = await this.pfeRepository.findOneBy({
            idpfe: id,
        });
        console.log(Pfe);
        if (!Pfe) {
            throw new ForbiddenException('Not found');
        }
        return Pfe;
    }
    async deletePfeById(id: string): Promise<DeleteResult> {
        const pfe: Pfe = await this.findPfeById(id);
        if (pfe) {
            return this.pfeRepository.delete({ idpfe: id });
        } else {
            throw new ForbiddenException('Error happened');
        }
    }
    async updatePfeById(updatePfeDto: UpdatePfeDto) {
        console.log(updatePfeDto);

        const toUpdate: Pfe = await this.pfeRepository.findOneBy({
            idpfe: updatePfeDto.idpfe,
        });
        console.log(toUpdate);
        if (toUpdate) {
            return await this.pfeRepository.save(updatePfeDto);
        } else {
            throw new ForbiddenException('Pfe not found .. !');
        }
    }
    async beEncadrant(id: string, idEnseignant: string) {
        const pfe = await this.findPfeById(id);
        pfe.idEnseignant = idEnseignant;
        return this.updatePfeById(pfe);
    }
    async stats():Promise<any>{
        const all = await this.findAllPfe();
        const pays: any = [];
        const societe: any = [];
        const type: any = [];

        var counting = 0;

        const all_pfe = (await all).reduce((all_pfe: { [key: string]: any }, item) => {
            const pfe = all_pfe[item.pays] || [];
            pfe.push(item);
            all_pfe[item.pays] = pfe;
            return all_pfe;
        }, {});
        Object.keys(all_pfe).map((pfe) => {
            counting = 0;
            const value = all_pfe[pfe];
            value.map((d: any) => {
                if (d.pays === pfe) {
                    counting++;
                }
            }),
                pays.push({
                    pays: pfe,
                    count: counting,
                })
        })
        const par_societe = (await all).reduce((all_pfe: { [key: string]: any }, item) => {
            const pfe = all_pfe[item.societe] || [];
            pfe.push(item);
            all_pfe[item.societe] = pfe;
            return all_pfe;
        }, {});
        Object.keys(par_societe).map((pfe) => {
            counting = 0;
            const value = par_societe[pfe];
            value.map((d: any) => {
                if (d.societe === pfe) {
                    counting++;
                }
            }),
                societe.push({
                    societe: pfe,
                    count: counting,
                })
        })
        const par_type = (await all).reduce((all_pfe: { [key: string]: any }, item) => {
            const pfe = all_pfe[item.type] || [];
            pfe.push(item);
            all_pfe[item.type] = pfe;
            return all_pfe;
        }, {});
        Object.keys(par_type).map((pfe) => {
            counting = 0;
            const value = par_type[pfe];
            value.map((d: any) => {
                if (d.type === pfe) {
                    counting++;
                }
            }),
                type.push({
                    type: pfe,
                    count: counting,
                })
        })
        const table = [...pays, ...societe, ...type];
        console.log(table);
        return table;
        
    }

}
